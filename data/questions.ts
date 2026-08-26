export type FieldType = "text" | "textarea" | "select";

export interface Question {
  id: string;
  label: string;
  type: FieldType;
  options?: string[];
  placeholder?: string;
}

export const questionsByService: Record<string, Question[]> = {
  presentations: [
    { id: "purpose", label: "What's this presentation for?", type: "text", placeholder: "Investor pitch, sales deck, internal report..." },
    { id: "length", label: "How many slides do you expect, roughly?", type: "text", placeholder: "e.g. 12–15" },
    { id: "brand", label: "Do you have existing brand guidelines to follow?", type: "textarea", placeholder: "Logo, colors, fonts, or 'none yet'" },
  ],
  "business-dashboards": [
    { id: "platform", label: "Which platform do you prefer?", type: "select", options: ["Power BI", "Looker", "Excel", "HTML", "Not sure"] },
    { id: "sources", label: "What data sources need to be connected?", type: "textarea", placeholder: "e.g. Google Sheets, SQL database, CRM export" },
    { id: "audience", label: "Who is the primary audience for this dashboard?", type: "text" },
  ],
  websites: [
    { id: "stage", label: "Is this a new website or a redesign?", type: "select", options: ["New website", "Redesign", "Ongoing management only"] },
    { id: "goal", label: "What's the main goal of the site?", type: "text", placeholder: "Leads, sales, information, a portfolio..." },
    { id: "branding", label: "Do you have existing branding ready to use?", type: "textarea", placeholder: "Logo, colors, or 'none yet'" },
  ],
  "business-consultancy": [
    { id: "challenge", label: "What business challenge do you want help with?", type: "textarea" },
    { id: "tried", label: "What have you already tried?", type: "textarea" },
    { id: "timeframe", label: "What timeframe are you working with?", type: "text" },
  ],
  "marketing-sales-strategy": [
    { id: "offer", label: "What are you trying to promote or sell?", type: "text" },
    { id: "audience", label: "Who is your target audience?", type: "textarea" },
    { id: "current", label: "What's your current sales or marketing process, if any?", type: "textarea" },
  ],
  "business-documents": [
    { id: "docs", label: "Which documents do you need?", type: "textarea", placeholder: "SOPs, policies, proposals, contracts..." },
    { id: "stage", label: "Starting from scratch or updating existing documents?", type: "select", options: ["From scratch", "Updating existing"] },
    { id: "format", label: "Any specific format or template required?", type: "text" },
  ],
  "business-analysis": [
    { id: "area", label: "What process or area needs analysis?", type: "textarea" },
    { id: "data", label: "What data do you currently have access to?", type: "textarea" },
    { id: "decision", label: "What decision will this analysis support?", type: "text" },
  ],
  "erp-development": [
    { id: "path", label: "Odoo, or custom-built?", type: "select", options: ["Odoo", "Custom code", "Not sure"] },
    { id: "functions", label: "Which business functions need to be covered?", type: "textarea", placeholder: "Inventory, sales, HR, accounting..." },
    { id: "migration", label: "Do you have an existing system to migrate from?", type: "text" },
  ],
  "business-apps": [
    { id: "purpose", label: "What should this app do, in a sentence or two?", type: "textarea" },
    { id: "users", label: "Who will use it?", type: "select", options: ["Internal team", "Customers", "Both"] },
    { id: "platform", label: "Any platform preference?", type: "text", placeholder: "Web, mobile, both, no preference" },
  ],
};
