"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "./separator";

type OverflowTabProps = React.ReactElement<
  TabsPrimitive.TabsTriggerProps & {
    showBorder?: boolean;
  }
>;

const OverflowTabs = TabsPrimitive.Root;

const OverflowTabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const [overflowTabs, setOverflowTabs] = React.useState<OverflowTabProps[]>(
    []
  );
  const tabsRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const dropdownRef = React.useRef<HTMLButtonElement>(null);

  const validChildren = React.useMemo(() => {
    return React.Children.toArray(props.children).filter((child) =>
      React.isValidElement(child)
    );
  }, [props.children]);

  React.useEffect(() => {
    const updateOverflowTabs = () => {
      if (tabsRef.current && containerRef.current && dropdownRef.current) {
        const containerRect = containerRef.current?.getBoundingClientRect();
        const tabElements = Array.from(
          tabsRef.current.children
        ) as HTMLElement[];
        const dropdownRect = dropdownRef.current?.getBoundingClientRect();

        const overflow: OverflowTabProps[] = [];
        let totalWidth = 0;
        let firstRowBottom = 0;

        validChildren.forEach((child, index) => {
          const element = tabElements[index];
          const tabRect = element.getBoundingClientRect();

          if (index === 0) firstRowBottom = tabRect.bottom;
          totalWidth += tabRect.width;

          if (
            tabRect.bottom > firstRowBottom ||
            totalWidth + dropdownRect.width > containerRect.width
          ) {
            element.style.visibility = "hidden";
            element.dataset.overflow = "true";
            overflow.push(child as OverflowTabProps);
          } else {
            element.style.visibility = "visible";
            element.dataset.overflow = "false";
          }
        });
        setOverflowTabs(overflow);
      }
    };

    const resizeObserver = new ResizeObserver(updateOverflowTabs);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    updateOverflowTabs();

    return () => {
      resizeObserver.disconnect();
    };
  }, [props.children]);

  return (
    <div ref={containerRef} className="w-full">
      <TabsPrimitive.List
        ref={ref}
        className={cn(
          "relative flex w-full items-start text-muted-foreground",
          className
        )}
        {...props}
      >
        <div ref={tabsRef} className="flex h-10 flex-wrap gap-4 py-0.5">
          {props.children}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              ref={dropdownRef}
              className={cn(
                "ml-auto mt-1.5 h-7 w-7 min-w-[28px] p-0",
                !overflowTabs.length && "sr-only hidden"
              )}
              variant="ghost"
            >
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={10} className="w-min">
            {overflowTabs.map((tab, index) => {
              return (
                <DropdownMenuItem
                  key={index}
                  className={cn("m-0 p-0")}
                  onSelect={(e) => e.preventDefault()}
                >
                  {React.cloneElement(tab, {
                    className: cn(
                      "w-full min-h-8 m-0 px-2 hover:bg-accent justify-start py-1 my-0 !h-auto",
                      "after:absolute after:invisible data-[state=active]:after:visible",
                      "after:-left-1 after:h-[calc(100%-8px)] after:w-full after:w-0.5",
                      "after:rounded-full after:bg-primary",
                      tab.props.className
                    ),
                    showBorder: false,
                    children: tab.props.children,
                  })}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </TabsPrimitive.List>
      <Separator />
    </div>
  );
});
OverflowTabsList.displayName = TabsPrimitive.List.displayName;

const OverflowTabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    showBorder?: boolean;
  }
>(({ className, showBorder = true, ...props }, ref) => (
  <TabsPrimitive.Trigger
    className={cn(
      "px-1 data-[overflow=true]:before:hidden",
      "data-[state=active]:pointer-events-none data-[state=active]:bg-transparent",
      "group relative inline-flex h-9 items-center gap-2 whitespace-nowrap",
      "text-sm font-normal ring-offset-background focus-visible:outline-none",
      "rounded-md hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring",
      "before:rounded-full disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground",
      "before:invisible before:absolute before:-bottom-0.5 before:left-0 before:h-0.5 before:w-full before:bg-primary data-[state=active]:before:visible",
      !showBorder && "before:!invisible",
      className
    )}
    ref={ref}
    tabIndex={1}
    onFocus={(e) => e.preventDefault()}
    {...props}
  >
    {props.children}
  </TabsPrimitive.Trigger>
));
OverflowTabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const OverflowTabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
OverflowTabsContent.displayName = TabsPrimitive.Content.displayName;

export {
  OverflowTabs,
  OverflowTabsList,
  OverflowTabsTrigger,
  OverflowTabsContent,
};
