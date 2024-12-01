# overflow-tabs
A responsive Shadcn/UI tab component


### Demo
https://overflow-tabs.vercel.app/

https://github.com/user-attachments/assets/4dc069dc-71e1-4b15-950e-d9d8b2e25fb1


### Usage

```js
<OverflowTabs defaultValue="tab1">
    <OverflowTabsList>
        <OverflowTabsTrigger value="tab1">Tab 1</OverflowTabsTrigger>
        <OverflowTabsTrigger value="tab2">Tab 2</OverflowTabsTrigger>
        <OverflowTabsTrigger value="tab3">Tab 3</OverflowTabsTrigger>
    </OverflowTabsList>

    <OverflowTabsContent value="tab1">Tab 1 content</OverflowTabsContent>
    <OverflowTabsContent value="tab2">Tab 2 content</OverflowTabsContent>
    <OverflowTabsContent value="tab3">Tab 3 content</OverflowTabsContent>
</OverflowTabs>
```


### Install dependencies

@radix-ui/react-tabs

```
pnpm add @radix-ui/react-tabs
```

Shadcn/UI Button and Dropdown Menu

```
pnpm dlx shadcn@latest add button dropdown-menu
```

Lucide Icons

```
pnpm add lucide-react
```
