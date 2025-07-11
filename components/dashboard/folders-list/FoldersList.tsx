import FolderComp from "./FolderComp"

function FoldersList({folders}: {folders: {name: string}[]}) {
    return (
        <div className="w-full space-y-3">
            {folders.map(folder=>(
                <FolderComp folderName={folder.name} key={folder.name}/>
            ))}
        </div>
    )
}

export default FoldersList