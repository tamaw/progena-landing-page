// Every word on the page lives here. Templates only decide layout.

const deployCta = { label: 'Deploy to Azure', disabled: true };

// The seven verbs are the app's own sidebar group titles. The chat types them
// out ("Orchestrating...") while it works; the site reuses that signature.
const verbs = ['Orchestrating', 'Spectating', 'Operating', 'Automating', 'Delegating', 'Facilitating', 'Integrating'];

export const content = {
  site: {
    name: 'Progena AI',
    domain: 'progena.ai',
    url: 'https://progena.ai/',
    title: 'Progena AI · Team orchestration for cloud and software work',
    description:
      'Progena AI helps technical teams coordinate cloud and software work: connect specialist agents and tools, automate workflows, and stay in control.',
    year: 2026,
  },

  nav: [
    { label: 'How it works', href: '#how' },
    { label: 'Platform', href: '#platform' },
    { label: 'Workflows', href: '#ideas' },
    { label: 'Who it’s for', href: '#who' },
    { label: 'Why Progena AI', href: '#why' },
    { label: 'Deploy', href: '#deploy' },
    { label: 'FAQ', href: '#faq' },
    { label: 'GitHub', href: 'https://github.com/tamaw/progenitor' },
  ],

  tagline: { prefix: 'Always', words: verbs, first: 'Orchestrating', suffix: '...' },

  hero: {
    lead:
      'Progena AI lives in your cloud, turning your team’s everyday work into always-on automation.',
    pitch:
      'Your AI team, at work.',
    primary: deployCta,
    secondary: { label: 'View on GitHub', href: 'https://github.com/tamaw/progenitor' },
    note: 'Progena AI is a hosted, stateful orchestration agent built for teams, powered by LangGraph and Microsoft Foundry.',
  },

  demo: {
    nav: [
      { group: 'Orchestrate', items: ['Inbox', 'Chat'], active: 'Chat' },
      { group: 'Spectate', items: ['Dashboard'] },
      { group: 'Operate', items: ['Tasks'] },
      { group: 'Automate', items: ['Workflows', 'Routines'] },
      { group: 'Delegate', items: ['Agents'] },
      { group: 'Facilitate', items: ['Tools', 'Knowledge', 'Schedules'] },
      { group: 'Integrate', items: ['Channels', 'Repositories'] },
    ],
    title: 'Agentic workflow',
    prompt:
      'Allow our staging app to reach api.vendor.com over HTTPS. Ask me before changing the firewall.',
    steps: [
      { label: 'Context gathered', detail: 'Staging app and firewall policy', time: '' },
      { label: 'Network specialist', detail: 'Prepared a scoped application rule', time: '' },
      { label: 'Approval checkpoint', detail: 'Review the proposed rule', time: '' },
      { label: 'After approval', detail: 'Apply, check access and report', time: '' },
    ],
    reply:
      'Network specialist, inspect staging-app and prepare a scoped HTTPS rule for api.vendor.com. Workflow agent, send the proposal for approval and line up an access check for after the change.',
    caption: 'Progena AI brings the agents, tools and approvals together.',
    composer: 'What should we automate next?',
  },

  platform: {
    eyebrow: 'The platform',
    title: 'Seven verbs. One coordinated AI team.',
    intro:
      'Bring your team’s workflows together and move cloud work forward. Progena AI works alongside your team, coordinating specialist agents, tools and recurring tasks, even when you’re offline.',
    pillars: [
      {
        id: 'orchestrate',
        verb: 'Orchestrate',
        headline: 'Fewer hand-offs between request and result.',
        body:
          'Describe the outcome in one place. Progena can break it into steps and coordinate the specialists and tools involved, keeping the work connected as it moves forward.',
        points: ['Plain-language requests, no scripting', 'Reports collected in one place', 'Approval steps when a workflow is configured to need one'],
        visual: {
          kind: 'orchestrate',
          ask: 'Summarise last night’s deploys and anything that failed.',
          report: {
            title: 'Overnight deploy report',
            meta: 'Inbox · just now',
            rows: [
              { label: 'Deploys', value: '14 succeeded' },
              { label: 'Rolled back', value: '1 · billing-api' },
              { label: 'Action needed', value: 'Approve retry' },
            ],
          },
        },
      },
      {
        id: 'spectate',
        verb: 'Spectate',
        headline: 'See progress without chasing updates.',
        body:
          'Follow the hand-offs between agents and tools without chasing updates. Inspect each step and its result, review the run history, or stop a run when you need to intervene.',
        points: ['Agent hand-offs and tool results in one view', 'Run history for later review', 'Stop a run when you need to intervene'],
        visual: {
          kind: 'spectate',
          run: 'Run #2814 · Nightly backup check',
          steps: [
            { label: 'Thinking', detail: 'Which regions changed today?', state: 'done', time: '0.9s' },
            { label: 'Checked backups', detail: '3 regions', state: 'done', time: '2.4s' },
            { label: 'Verified restore', detail: 'eu-west snapshot', state: 'done', time: '11.2s' },
            { label: 'Writing summary', detail: 'streaming', state: 'live', time: '' },
          ],
        },
      },
      {
        id: 'operate',
        verb: 'Operate',
        headline: 'Keep work moving from backlog to result.',
        body:
          'Work lives on a board you share with Progena. Connect workflows to card changes so routine tasks move forward without another round of messages and manual hand-offs.',
        points: ['A task board you and Progena share', 'Trigger configured workflows when cards change', 'Priorities and labels at a glance'],
        visual: {
          kind: 'operate',
          columns: [
            { title: 'To do', cards: [{ title: 'Rotate staging API keys', tag: 'Security' }, { title: 'Clean up unused volumes', tag: 'Cost' }] },
            { title: 'In progress', cards: [{ title: 'Patch base images', tag: 'Progena', live: true }] },
            { title: 'Done', cards: [{ title: 'Review access drift', tag: 'Security' }, { title: 'Renew TLS certificates', tag: 'Ops' }] },
          ],
        },
      },
      {
        id: 'automate',
        verb: 'Automate',
        headline: 'Stop restarting the same routine work.',
        body:
          'Create a workflow on a visual canvas or describe it. Connect specialists, add schedules and branches, and place approval steps before changes that need your say.',
        points: [
          'Visual workflow builder, or describe it in chat',
          'Schedules, triggers, branches and parallel steps',
          'Review proposed changes at configured approval steps',
          'Retries, timeouts and limits configurable by policy',
        ],
        visual: { kind: 'automate' },
      },
      {
        id: 'delegate',
        verb: 'Delegate',
        headline: 'Specialists, without separate conversations.',
        body:
          'Bring custom agents, remote specialists and coding agents into the same flow of work. Progena delegates their part and tracks the task, so you do not have to carry context between separate conversations.',
        points: [
          'Custom agents with their own instructions and tools',
          'Connect compatible agents through open standards',
          'Use specialists for defined parts of a workflow',
        ],
        visual: {
          kind: 'delegate',
          agents: [
            { name: 'Researcher', role: 'Finds and verifies answers', state: 'Running' },
            { name: 'Code reviewer', role: 'Reviews every pull request', state: 'Ready' },
            { name: 'GitHub Copilot', role: 'Coding agent', state: 'Ready' },
            { name: 'Cost analyst', role: 'New agent', state: 'Building' },
          ],
        },
      },
      {
        id: 'facilitate',
        verb: 'Facilitate',
        headline: 'Keep useful context close to the work.',
        body:
          'Keep working knowledge and tools beside the task. Progena can write and update knowledge pages as it learns, while version history lets you review what changed.',
        points: [
          'Versioned knowledge that grows with the work',
          'Semantic search for relevant context',
          'Enable or disable connected tools',
        ],
        visual: {
          kind: 'facilitate',
          page: { title: 'Runbook: database failover', meta: 'Version 7 · updated 2h ago by Progena', lines: [92, 78, 85, 60] },
          tools: [
            { name: 'Web search', on: true },
            { name: 'GitHub', on: true },
            { name: 'Cloud console', on: true },
            { name: 'Ticketing', on: false },
          ],
        },
      },
      {
        id: 'integrate',
        verb: 'Integrate',
        headline: 'Coordinate work across the stack you use.',
        body:
          'Connect supported channels, repositories, tools and agents so workflow context can travel with the work instead of being recreated at each hand-off.',
        points: ['Context retained per chat and thread', 'Repository branches, changes and recent commits', 'Web app and Telegram today; more channels planned'],
        visual: {
          kind: 'integrate',
          channels: [
            { name: 'Web app', live: true },
            { name: 'Telegram', live: true },
            { name: 'Git repositories', live: true },
            { name: 'Slack', live: false },
            { name: 'Microsoft Teams', live: false },
            { name: 'Discord', live: false },
            { name: 'WhatsApp', live: false },
            { name: 'Email', live: false },
            { name: 'SMS', live: false },
            { name: 'Webhooks', live: false },
          ],
        },
      },
    ],
  },

  how: {
    eyebrow: 'How it works',
    title: 'Agentic workflow',
    intro:
      'Your next cloud workflow starts with a conversation. Turn everyday cloud requests into repeatable workflows that bring the right agents, tools and people together. Less chasing. More getting work done.',
    playback: {
      prompt: 'Build a vendor-access workflow. Use a network specialist and ask Greg before firewall changes.',
      user: 'You',
      agent: 'Progena AI',
      reply: 'I’ll prepare the workflow and specialist. Greg gets the proposal in his inbox before any change is applied.',
    },
    steps: [
      {
        title: 'Build and delegate',
        body: 'Progena AI creates the workflow and brings in a network specialist to inspect the environment and prepare a scoped change.',
      },
      {
        title: 'Get the right approval',
        body: 'Keep the right people in control. Route proposed changes for approval, then let the workflow pick up automatically once they’re signed off.',
      },
      {
        title: 'Run, check and report',
        body: 'After approval, the specialist applies the change and checks access. Progena AI collects the result and keeps the workflow ready for next time.',
      },
    ],
  },

  ideas: {
    eyebrow: 'Workflow automation',
    title: 'What could Progena AI automate for your team?',
    intro: 'From daily checks to coordinated cloud changes, bring recurring work into workflows that keep your team moving.',
    featured: 'Top picks',
    note: 'Build on automations from the Progena AI marketplace, then make them your own with your team’s tools and workflows.',
    sourceLabel: 'Inspired by Agent confidence on the technical frontier',
    sourceUrl: 'https://wp.technologyreview.com/wp-content/uploads/2026/06/MITTRI_Microsoft_Report_June26.pdf#page=18',
    categories: [
      { id: 'reliability', label: 'Reliability & operations' },
      { id: 'security', label: 'Security & access' },
      { id: 'cost', label: 'Cost & capacity' },
      { id: 'service', label: 'Team & service workflows' },
      { id: 'platform', label: 'Platform & infrastructure' },
    ],
    items: [
      { category: 'security', topPick: true, title: 'Stay ahead of certificate expiry', request: 'Check our certificates each day and prepare renewals before they expire.', outcome: 'Track expiry dates, notify owners and coordinate renewal with the required approvals.' },
      { category: 'service', topPick: true, title: 'Route requests to the right specialist', request: 'Triage incoming cloud tickets and send each one to the right owner.', outcome: 'Gather context, classify the request and prepare a useful first response.' },
      { category: 'reliability', topPick: true, title: 'Catch performance drift', request: 'Compare production performance with our baseline and flag unusual changes.', outcome: 'Review trends, collect supporting signals and summarise what needs attention.' },
      { category: 'cost', topPick: true, title: 'Keep cloud spend in view', request: 'Check our cloud budgets every morning and explain unexpected spend.', outcome: 'Compare costs across connected environments, investigate changes and alert the owner.' },
      { category: 'reliability', topPick: true, title: 'Turn noisy logs into useful findings', request: 'Review overnight logs and bring me the anomalies worth investigating.', outcome: 'Collect relevant logs, group unusual patterns and prepare an investigation brief.' },
      { category: 'service', title: 'Keep runbooks up to date', request: 'Turn completed cloud changes into proposed runbook updates.', outcome: 'Capture what changed, draft documentation and send it to the owner for review.' },
      { category: 'cost', title: 'Plan capacity before demand arrives', request: 'Review growth trends and tell us where we may run short next month.', outcome: 'Forecast demand, identify capacity pressure and propose next steps.' },
      { category: 'cost', title: 'Tune scaling policies', request: 'Review our autoscaling rules against recent demand.', outcome: 'Compare policies with usage patterns and propose adjustments before applying changes.' },
      { category: 'service', title: 'Follow up on service commitments', request: 'Check vendor service levels and flag commitments that need follow-up.', outcome: 'Collect service indicators, identify potential SLA misses and prepare owner updates.' },
      { category: 'security', title: 'Prepare evidence for an audit', request: 'Collect this month’s cloud compliance evidence into a review pack.', outcome: 'Gather configured evidence sources, highlight gaps and organise material for human review.' },
      { category: 'reliability', title: 'Triage incidents while the team is offline', request: 'When an overnight alert fires, gather context and prepare an initial diagnosis.', outcome: 'Collect relevant signals, suggest investigation paths and hand over a concise incident brief.' },
      { category: 'security', title: 'Review access that may no longer be needed', request: 'Find stale access assignments and send a cleanup proposal to the owners.', outcome: 'Inventory privileges, identify review candidates and request approval before removals.' },
      { category: 'reliability', title: 'Check service health and dependencies', request: 'Check our key services and map the dependencies behind any failures.', outcome: 'Run configured health checks and connect symptoms to affected services.' },
      { category: 'reliability', title: 'Coordinate database maintenance', request: 'Prepare the weekly database maintenance plan and track each task.', outcome: 'Schedule configured jobs, collect their results and flag missed or failed work.' },
      { category: 'security', title: 'Prioritise patches that matter', request: 'Review vulnerability findings and propose a patch order.', outcome: 'Group findings by affected assets and impact, then prepare a remediation plan.' },
      { category: 'reliability', title: 'Check that backups can be recovered', request: 'Review backup status and coordinate an isolated restore test.', outcome: 'Track recovery checks and report gaps without treating a successful backup job as proof of recovery.' },
      { category: 'service', title: 'Keep the cloud inventory current', request: 'Refresh our asset inventory and flag resources nearing end of life.', outcome: 'Track ownership and lifecycle information so the team knows what needs attention.' },
      { category: 'platform', topPick: true, title: 'Review network changes', request: 'Compare network changes with our intended configuration and run the relevant checks.', outcome: 'Identify changes, explain their scope and collect validation results.' },
      { category: 'platform', title: 'Spot configuration drift between environments', request: 'Compare staging and production settings and propose the differences to reconcile.', outcome: 'Highlight mismatches while preserving intentional environment-specific settings.' },
      { category: 'reliability', title: 'Run the runbook, check the result', request: 'Execute our approved recovery runbook and report each checkpoint.', outcome: 'Coordinate the configured steps, pause where required and collect verification results.' },
      { category: 'platform', title: 'Plan patching with a way back', request: 'Prepare the next server patch window, including checks and a rollback plan.', outcome: 'Coordinate targets, dependencies and approvals before the maintenance window.' },
      { category: 'reliability', title: 'Build an outage investigation brief', request: 'Correlate the outage timeline, logs and recent changes.', outcome: 'Bring together evidence and candidate causes for the team to investigate.' },
      { category: 'platform', title: 'Review container workload health', request: 'Check our container workloads and propose reliability or resource improvements.', outcome: 'Review workload signals and configuration, then prepare scoped recommendations.' },
      { category: 'security', title: 'Make security alerts easier to triage', request: 'Group related alerts and flag likely duplicates for review.', outcome: 'Enrich findings with context without silently dismissing alerts or assuming they are harmless.' },
      { category: 'service', title: 'Coordinate the incident handover', request: 'Keep the incident timeline and handover notes current as work progresses.', outcome: 'Track actions, gather updates and prepare a clear summary for the next responder.' },
      { category: 'platform', title: 'Map a cloud migration', request: 'Inventory this service’s dependencies and prepare a migration plan.', outcome: 'Identify prerequisites, sequence the work and surface decisions for the team.' },
      { category: 'security', title: 'Review cloud security posture', request: 'Collect configuration findings and highlight the highest-priority review areas.', outcome: 'Organise evidence and recommendations without treating the assessment as a compliance guarantee.' },
      { category: 'security', title: 'Find deviations from security policy', request: 'Compare our cloud settings with the policies we have configured.', outcome: 'Flag deviations and route proposed remediation through the required approvals.' },
      { category: 'security', title: 'Investigate suspicious network patterns', request: 'Summarise unusual network activity and gather context for security review.', outcome: 'Correlate configured network signals and prepare findings for a qualified responder.' },
      { category: 'service', title: 'Prepare cloud change reviews', request: 'Assess the dependencies and potential impact of this proposed change.', outcome: 'Bring the scope, risks and verification plan together before an approver decides.' },
      { category: 'reliability', title: 'Rehearse disaster recovery', request: 'Coordinate a scoped recovery exercise and record what we learn.', outcome: 'Track the approved test plan, collect recovery evidence and identify follow-up work.' },
      { category: 'platform', title: 'Untangle service mesh issues', request: 'Gather mesh configuration and traffic signals for this connectivity issue.', outcome: 'Prepare a troubleshooting brief and proposed checks before any configuration change.' },
    ],
  },

  audiences: {
    eyebrow: 'Who it’s for',
    title: 'Built for cloud engineering and operations.',
    intro: 'New apps. Everyday requests. Busy environments. Bring the work together, without becoming the person chasing every next step.',
    note: 'Connect your tools and shape each workflow around your team’s permissions and approvals.',
    items: [
      {
        label: 'Cloud engineering',
        visual: 'engineering',
        title: 'From “new app” to “let’s ship it.”',
        body: 'Bring identities, deployments and migration steps into coordinated workflows. More building. Less bouncing between tools.',
        requests: [
          'Create an Entra app identity for my new app.',
          'Deploy my proof of concept.',
          'Plan and coordinate my app’s move to Azure.',
        ],
      },
      {
        label: 'Cloud operations',
        visual: 'operations',
        title: 'Keep the cloud work flowing.',
        body: 'Turn incoming requests and recurring checks into repeatable workflows. Keep the right people involved without chasing every hand-off.',
        requests: [
          'Allow this URL through our firewall, with approval.',
          'Monitor my app during peak hours and send a performance report.',
        ],
      },
    ],
  },

  benefits: {
    eyebrow: 'Why Progena AI',
    title: 'Your cloud. Your rules. Your AI team.',
    intro: 'All the cloud power. None of the laptop babysitting.',
    items: [
      { icon: 'budget', label: 'Team-budgeted AI', title: 'Big team energy. Cloud-budgeted AI.', body: 'Give everyday workflows their own cloud model capacity. Keep personal chat allowances for personal work.', note: 'Uses your configured Azure OpenAI deployment. Provider charges and limits apply; connected agents may be billed separately.' },
      { icon: 'helix', label: 'Your code', title: 'Make it work your way.', body: 'Your team has its own way of getting things done. Adapt the code, extend the integrations and make Progena AI part of it.', note: 'Customise the runtime you host, not just the prompts you send.' },
      { icon: 'shield', label: 'Cloud access', title: 'Open the right doors. Not every door.', body: 'Connect workflows to the tools they need, with the identities and permissions you choose.', note: 'Access depends on the permissions and cloud controls you configure.' },
      { icon: 'network', label: 'Private connections', title: 'Good neighbours for your apps.', body: 'Let Progena AI work alongside your applications, reaching private services without putting them on the public internet.', note: 'Private connectivity requires the appropriate network configuration.' },
      { icon: 'database', label: 'Data choices', title: 'Your data. A route you choose.', body: 'Choose where workflow data lives and which models and services it travels to. Keep the destination in your hands.', note: 'Connected providers have their own processing and data-residency terms.' },
    ],
  },

  selfHost: {
    eyebrow: 'Deploy to Azure',
    title: 'Your cloud. Your model capacity. Your control.',
    body: 'Power the work with your cloud, not your personal chat allowance. Progena AI’s core assistant runs on the Azure OpenAI deployment you configure.',
    qualification:
      'Model-provider charges and limits apply. Connected specialist agents and services may use separate accounts, quotas and bills.',
    availability:
      'The product runtime includes the web app, agent orchestration and database. The guided Azure deployment shown here is planned, not yet available.',
    previewTitle: 'Guided Azure deployment · planned',
    previewSteps: ['Choose your Azure subscription', 'Configure your environment', 'Review and deploy Progena AI'],
    previewNote: 'Guided Azure deployment is not available yet.',
    points: [
      { title: 'One operational workspace', body: 'Tasks, workflow activity and results in the same place.' },
      { title: 'Your configured model', body: 'The core assistant uses your Azure OpenAI endpoint and key.' },
      { title: 'Know where data goes', body: 'Work is stored in the runtime database; relevant data also goes to configured models and connected services.' },
    ],
    cta: deployCta,
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Questions, answered.',
    items: [
      {
        q: 'What is Progena AI?',
        a: 'Your always-on assistant and AI team orchestrator. Describe an outcome; Progena AI coordinates specialist agents, tools and workflows, tracks progress and collects results.',
      },
      {
        q: 'Who is it for?',
        a: 'Technical teams coordinating cloud and software work. Individuals can also use it for recurring workflows they want to plan, schedule and review.',
      },
      {
        q: 'Do I need to write code?',
        a: 'No. Describe workflows in plain language or build them on the visual canvas. Developers can also configure custom agents and tools.',
      },
      {
        q: 'Where does my data live?',
        a: 'Progena AI stores conversations, workflows, knowledge and run history in its database. Data used by a workflow can also be sent to the model deployment and connected services you configure. The guided Azure deployment is planned, not currently available.',
      },
      {
        q: 'Which AI models does it use, and what do they cost?',
        a: 'The Azure core assistant uses the Azure OpenAI deployment endpoint and key you configure, rather than a personal chat allowance. Model-provider charges and limits apply. External A2A or ACP agents may use separate accounts, quotas and bills.',
      },
      {
        q: 'Can it work with the agents and tools we already use?',
        a: 'It can connect compatible remote agents through A2A, coding agents through ACP, and tools through MCP. Each connected service has its own availability, account and usage terms.',
      },
      {
        q: 'What happens when a decision needs a human?',
        a: 'An approval node pauses the workflow where you configure it. You can approve or decline there; it is not a blanket approval requirement for every action in every workflow.',
      },
      {
        q: 'Are the product illustrations real runs?',
        a: 'They are illustrative interfaces, not recorded customer runs. The firewall example shows an agentic workflow with connected cloud tools, a configured specialist and an explicit approval step. It is not a ready-to-run firewall integration or a guarantee that every action requests approval.',
      },
      {
        q: 'Can I deploy Progena AI to Azure today?',
        a: 'The product has a web app, agent runtime and database, but the guided Deploy to Azure experience is not available yet. The buttons on this page are inactive while that deployment path is prepared.',
      },
      {
        q: 'How much does it cost?',
        a: 'Progena AI pricing and guided Azure deployment details will be shared before launch. Model-provider and connected-service charges may apply separately under the accounts and terms you configure.',
      },
    ],
  },

  finalCta: {
    prefix: 'Start',
    lead: 'Direct your AI team from one place. Delegate the specialist work, schedule the routine work, and keep the decisions that matter. Guided Azure deployment is coming soon.',
  },

  footer: {
    stats: ['AI team orchestration', 'Azure deployment coming soon'],
  },
};
