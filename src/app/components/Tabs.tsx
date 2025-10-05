"use client"

import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react"
import PatternSelector from "./PatternSelector"
import Editor from "./Editor"
import { ALPHANUMERIC_PATTERNS, PATTERNS } from "../patterns"
import { Grid6x5 } from "../grid"

type TabsProps = {
    selectedTab: number
    setSelectedTab: (index: number) => void
    setCurrentGrid: (pattern: Grid6x5) => void
}

export default function Tabs({ selectedTab, setSelectedTab, setCurrentGrid }: TabsProps) {
    return (
        <TabGroup
            selectedIndex={selectedTab}
            onChange={setSelectedTab}
            className="flex flex-col flex-1"
        >
            {/* Tab headers */}
            <TabList className="flex gap-2 justify-center xl:justify-start border-b border-gray-200 px-4 py-2 flex-shrink-0 bg-white rounded-t-xl shadow-sm">
                {["Patterns", "Letters", "Editor"].map((tab, index) => (
                    <Tab
                        key={tab}
                        className={`px-4 py-2 rounded-xl cursor-pointer font-medium transition focus:outline-none ${
                            selectedTab === index
                                ? "bg-gray-100 text-gray-900 shadow-inner"
                                : "bg-white text-gray-500 hover:bg-gray-50"
                        }`}
                    >
                        {tab}
                    </Tab>
                ))}
            </TabList>

            {/* Panels */}
            <TabPanels className="flex-1 relative">
                {/* Patterns */}
                <TabPanel className="xl:absolute inset-0 p-4 bg-gray-50 rounded-b-xl shadow-sm overflow-y-auto">
                    <PatternSelector patterns={PATTERNS} setCurrentGrid={setCurrentGrid} />
                </TabPanel>

                {/* Letters */}
                <TabPanel className="xl:absolute inset-0 p-4 bg-gray-50 rounded-b-xl shadow-sm overflow-y-auto">
                    <PatternSelector
                        patterns={ALPHANUMERIC_PATTERNS}
                        setCurrentGrid={setCurrentGrid}
                    />
                </TabPanel>

                {/* Editor */}
                <TabPanel className="xl:absolute inset-0 p-4 bg-gray-50 rounded-b-xl shadow-sm overflow-y-auto">
                    <Editor setCurrentGrid={setCurrentGrid} />
                </TabPanel>
            </TabPanels>
        </TabGroup>
    )
}
