import FolderComp from "./FolderComp"

function FilesList() {
    return (
        <div className="w-full space-y-3">
            <FolderComp folderName="All Files" numberFiles="43"/>
            <FolderComp folderName="Family" numberFiles="54"/>
            <FolderComp folderName="Job" numberFiles="67"/>
            <FolderComp folderName="Job" numberFiles="67"/>
            <FolderComp folderName="Job" numberFiles="67"/>
            <FolderComp folderName="Job" numberFiles="67"/>
            <FolderComp folderName="Job" numberFiles="67"/>
        </div>
    )
}

export default FilesList