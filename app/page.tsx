"use client";

import { Button } from "@/components/ui/button";
import {
  OverflowTabs,
  OverflowTabsContent,
  OverflowTabsList,
  OverflowTabsTrigger,
} from "@/components/ui/overflow-tabs";
import {
  ContactIcon,
  DollarSignIcon,
  HomeIcon,
  InfoIcon,
  MoonIcon,
  RssIcon,
  ScrollTextIcon,
  SparklesIcon,
  SunIcon,
  UsersIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function Page() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="px-8 pt-24">
      <div className="max-w-4xl flex items-center flex-col space-y-16 mx-auto">
        <div className="space-y-2 w-full relative">
          <h1 className="text-2xl font-bold">Shadcn/UI Overflow Tabs</h1>
          <Link
            target="_blank"
            className="text-sm text-muted-foreground hover:underline hover:text-foreground"
            href="https://github.com/diegofrr/overflow-tabs"
          >
            diegofrr/overflow-tabs
          </Link>

          <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="absolute right-0 top-0 !m-0"
            variant="ghost"
            size="icon"
          >
            {theme === "light" ? <SunIcon size={16} /> : <MoonIcon size={16} />}
          </Button>
        </div>

        <OverflowTabs defaultValue="home" className="w-full">
          <OverflowTabsList>
            <OverflowTabsTrigger value="home">
              <HomeIcon size={16} />
              Home
            </OverflowTabsTrigger>
            <OverflowTabsTrigger value="about">
              <InfoIcon size={16} />
              About
            </OverflowTabsTrigger>
            <OverflowTabsTrigger value="contact">
              <ContactIcon size={16} />
              Contact
            </OverflowTabsTrigger>
            <OverflowTabsTrigger value="features">
              <SparklesIcon size={16} />
              Features
            </OverflowTabsTrigger>
            <OverflowTabsTrigger value="pricing">
              <DollarSignIcon size={16} />
              Pricing
            </OverflowTabsTrigger>
            <OverflowTabsTrigger value="documentation">
              <ScrollTextIcon size={16} />
              Documentation
            </OverflowTabsTrigger>
            <OverflowTabsTrigger value="blog">
              <RssIcon size={16} />
              Blog
            </OverflowTabsTrigger>
            <OverflowTabsTrigger value="community">
              <UsersIcon size={16} />
              Community
            </OverflowTabsTrigger>
          </OverflowTabsList>

          <OverflowTabsContent value="home">
            Welcome to the home page!
          </OverflowTabsContent>
          <OverflowTabsContent value="about">
            Learn more about us on this page.
          </OverflowTabsContent>
          <OverflowTabsContent value="contact">
            Get in touch with us here.
          </OverflowTabsContent>
          <OverflowTabsContent value="features">
            Learn more about our features here.
          </OverflowTabsContent>
          <OverflowTabsContent value="pricing">
            Learn more about our pricing here.
          </OverflowTabsContent>
          <OverflowTabsContent value="documentation">
            Learn more about our documentation here.
          </OverflowTabsContent>
          <OverflowTabsContent value="blog">
            Learn more about our blog here.
          </OverflowTabsContent>
          <OverflowTabsContent value="community">
            Learn more about our community here.
          </OverflowTabsContent>
        </OverflowTabs>
      </div>
    </div>
  );
}
