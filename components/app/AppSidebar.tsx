import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import SidebarProfile from "./SidebarProfile"
import FolderCollapsible from "./FolderCollapsible"
import FolderItem from "./FolderItem"

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>

            </SidebarHeader>


            <SidebarContent className="list-none">

                <FolderCollapsible folderName="Pessoais">
                    <FolderItem>
                        One
                    </FolderItem>
                    <FolderItem>
                        Two
                    </FolderItem>
                </FolderCollapsible>

                <FolderCollapsible folderName="Trabalho">
                    <FolderItem>
                        One
                    </FolderItem>
                    <FolderItem>
                        Two
                    </FolderItem>
                    <FolderItem>
                        Three
                    </FolderItem>
                </FolderCollapsible>
                
            </SidebarContent>


            <SidebarFooter>
                <SidebarMenu>

                    <SidebarProfile />

                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}