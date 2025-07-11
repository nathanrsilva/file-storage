'use server'

import { cloudinary } from "@/lib/cloudinary"
import { createClient } from "@/util/supabase/server"
import { revalidatePath } from "next/cache"

export async function userStorage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // if (!user) throw new Error('User not authenticated')

    try {
        const result = await cloudinary.api.search_folders(user?.id as string)

        if (result.total_count === 0) {
            await cloudinary.api.create_folder(user?.id as string)
        }

    } catch (error) {
        console.error(error)
    }
}

export async function createFolder(formData: FormData) {

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const folderName = formData.get('folder-name') as string

    await cloudinary.api.create_folder(user?.id + '/' + folderName)

    const { data, error } = await supabase
        .from('users')
        .select('folders')
        .eq('user_id', user?.id)
        .single()

    if (error) throw error

    const folders = data.folders || []
    const updatedFolders = [...folders, folderName]

    const { error: updateError } = await supabase
        .from('users')
        .update({ folders: updatedFolders })
        .eq('user_id', user?.id);

    if (updateError) throw updateError;

    revalidatePath('/dashboard')
}

export async function renameFolder(formData: FormData) {

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const newFolderName = formData.get('folder-name') as string
    const oldFolder = formData.get('old-folder') as string

    // if (!user) throw new Error('User not authenticated')

    const initialPath = user?.id + '/'

    try {
        const result = await cloudinary.api.rename_folder(initialPath + oldFolder, initialPath + newFolderName)

        const { data, error } = await supabase
            .from('users')
            .select('folders')
            .eq('user_id', user?.id)
            .single()

        if (error) throw error

        const folders = data.folders || []
        const updatedFolders = folders.map((folder: string) => {
            if (folder === result.from.name) {
                return result.to.name
            }
            return folder
        })

        const { error: updateError } = await supabase
            .from('users')
            .update({ folders: updatedFolders })
            .eq('user_id', user?.id);

        if (updateError) throw updateError;


        revalidatePath('/dashboard')

    } catch (error) {
        console.error(error)
    }

}

type ErrorMessage = {
    error: {message: string}
}

export async function deleteFolder(formData: FormData) {

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const folderName = formData.get('folder-name') as string

    // if (!user) {
    //     throw new Error('User not authenticated')
    // }

    try {
        const result = await cloudinary.api.delete_folder(user?.id as string + '/' + folderName)

        const { data, error } = await supabase
            .from('users')
            .select('folders')
            .eq('user_id', user?.id)
            .single()

        if (error) throw error

        const folders = data.folders || []
        const updatedFolders = folders.filter((folder: string) => folder !== folderName)

        const { error: deleteError } = await supabase
            .from('users')
            .update({ folders: updatedFolders })
            .eq('user_id', user?.id);

        if (deleteError) throw deleteError;

        revalidatePath('/dashboard')

    } catch (error) {
        console.error(error)
    }
}

export async function getFolders() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // if (!user) throw new Error('User not authenticated')

    try {
        const result = await cloudinary.api.sub_folders(user?.id as string)

        return result.folders
    } catch (error) {
        console.error(error)
        return []
    }
}