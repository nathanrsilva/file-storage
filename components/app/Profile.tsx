import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

function Profile() {
    return (
        <div className="flex justify-between items-center space-x-3">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col -space-y-1">
                <span className="font-bold">Example</span>
                <span>useremail@example.com</span>
            </div>
        </div>
    )
}

export default Profile