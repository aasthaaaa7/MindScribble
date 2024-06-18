"use client";

import { ChevronsLeft, MenuIcon, Plus, PlusCircle, Search, Settings, Trash } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ElementRef, useRef, useState, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { UserItem } from "./user-item";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Item } from "./item";
import { toast } from "sonner";
import { DocumentList } from "./document-list";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { TrashBox } from "./trash-box";
import { useSearch } from "@/hooks/use-search";
import { useSettings } from "@/hooks/use-settings";
import { Navbar } from "./navbar";

export const Navigation = () => {
    const router = useRouter();
    const params = useParams();
    const settings = useSettings();
    const search = useSearch();
    const pathname = usePathname();
    const isMobile = useMediaQuery("(max-width: 768px)");
    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);
    const create = useMutation(api.documents.create);

    useEffect(() => {
        setIsCollapsed(isMobile);
    }, [isMobile]);

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();

        isResizingRef.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (!isResizingRef.current) return;
        let newWidth = event.clientX;

        if (newWidth < 300) newWidth = 300;
        if (newWidth > 540) newWidth = 540;

        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`;
            navbarRef.current.style.left = `${newWidth}px`;
            navbarRef.current.style.width = `calc(100% - ${newWidth}px)`;
        }
    };

    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false);
            setIsResetting(true);
            sidebarRef.current.style.width = isMobile? "100%" : "300px";
            navbarRef.current.style.setProperty(
                "width",
                isMobile? "0" : "calc(100% - 300px)"
            );
            navbarRef.current.style.setProperty(
                "left",
                isMobile? "100%" : "300px"
            );
            setTimeout(() => setIsResetting(false), 300);
        }
    };

    useEffect(() => {
        if (isMobile) {
            toggleCollapse();
        } else {
            resetWidth();
        }
    }, [isMobile]);

    useEffect(() => {
        if (sidebarRef.current && navbarRef.current) {
            if (isCollapsed) {
                sidebarRef.current.style.width = "0";
                navbarRef.current.style.left = "0";
                navbarRef.current.style.width = "100%";
            } else {
                const width = isMobile? "100%" : "300px";
                sidebarRef.current.style.width = width;
                navbarRef.current.style.left = isMobile? "0" : width;
                navbarRef.current.style.width = isMobile? "100%" : `calc(100% - ${width})`;
            }
        }
    }, [isCollapsed, isMobile]);

    const handleCreate = () => {
        const promise = create({
            title: "Untitled",
          }).then((documentId) => router.push(`/documents/${documentId}`));


        toast.promise(promise, {
            loading: "Creating a new note...",
            success: "New note created!",
            error: "Failed to create a new note."
        });
    };


    return (
        <>
            <aside
                ref={sidebarRef}
                className={cn(
                    "group h-full bg-secondary overflow-y-auto relative flex flex-col z-50 transition-all ease-in-out duration-300",
                    isCollapsed && "w-0",
                   !isCollapsed &&!isMobile && "w-72",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "w-0"
                )}
            >
                <div
                    role="button"
                    onClick={toggleCollapse}
                    className={cn(
                        "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover:opacity-100 transition",
                        isMobile && "opacity-100"
                    )}
                >
                    <ChevronsLeft className="h-6 w-6" />
                </div>
                <div>
                    <UserItem />
                    <Item
                        isSearch
                        label="Search"
                        icon={Search}
                        onClick={search.onOpen}
                    />
                    <Item
                        label="Settings"
                        icon={Settings}
                        onClick={settings.onOpen}
                    />
                    <Item
                        onClick={handleCreate}
                        label="New Page"
                        icon={PlusCircle}
                    />

                </div>
                <div className="mt-4">
                    <DocumentList />
                    <Item
                    onClick={handleCreate}
                    icon={Plus}
                    label="Add a page"
                    />
                    <Popover>
                        <PopoverTrigger className="w-full mt-4">
                            <Item  label="Trash" icon={Trash}/>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-72" side={isMobile ? "bottom" : "right"}>
                            <TrashBox/>
                        </PopoverContent>
                    </Popover>
                </div>
                <div
                    onMouseDown={handleMouseDown}
                    onClick={resetWidth}
                    className="opacity-0 group-hover:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
                />
            </aside>
            <div
                ref={navbarRef}
                className={cn(
                    "absolute top-0 z-50 transition-all ease-in-out duration-300",
                    !isCollapsed && !isMobile && "left-72 w-[calc(100%-300px)]",
                    (isCollapsed || isMobile) && "left-0 w-full"
                )}
            >
                {!!params.documentId? (
                    <Navbar
                        isCollapsed = {isCollapsed}
                        onResetWidth = {resetWidth}
                    />
                ) : (
                    <nav className="bg-transparent px-3 py-2 w-full">
                    {isCollapsed && <MenuIcon role="button" className="h-6 w-6 text-muted-foreground" onClick={toggleCollapse} />}
                </nav>
                )}
            </div>
        </>
    );
};
