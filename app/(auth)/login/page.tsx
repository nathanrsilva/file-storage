import VisibleForm from "@/components/auth/VisibleForm";
import { createClient } from '@/util/supabase/server'
import { redirect } from "next/navigation";

async function LoginPage() {

    const supabase = await createClient()
    const { data : {user} } = await supabase.auth.getUser()

    //If user logged, redirects to /dashboard
    if(user){
        redirect('/dashboard')
    }

    return (
        <VisibleForm/>
    )
}

export default LoginPage