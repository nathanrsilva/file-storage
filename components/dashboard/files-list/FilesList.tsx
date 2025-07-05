import FileComp from "./FileComp"

function FilesList() {
    return (
        <div className="w-full space-y-3">
            <FileComp fileName={"Mountains.jpg"} uploadedAt={"June 25, 2022"} fileSize={"243 KB"}/>
            <FileComp fileName={"Mountains.jpg"} uploadedAt={"June 25, 2022"} fileSize={"243 KB"}/>
            <FileComp fileName={"Mountains.jpg"} uploadedAt={"June 25, 2022"} fileSize={"243 KB"}/>
            <FileComp fileName={"Mountains.jpg"} uploadedAt={"June 25, 2022"} fileSize={"243 KB"}/>
            <FileComp fileName={"Mountains.jpg"} uploadedAt={"June 25, 2022"} fileSize={"243 KB"}/>
            <FileComp fileName={"Mountains.jpg"} uploadedAt={"June 25, 2022"} fileSize={"243 KB"}/>
            <FileComp fileName={"Mountains.jpg"} uploadedAt={"June 25, 2022"} fileSize={"243 KB"}/>
            <FileComp fileName={"Mountains.jpg"} uploadedAt={"June 25, 2022"} fileSize={"243 KB"}/>
        </div>
    )
}

export default FilesList