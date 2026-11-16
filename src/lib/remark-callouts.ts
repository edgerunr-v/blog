import type {
  Blockquote,
  Html,
  Paragraph,
  PhrasingContent,
  Root,
  RootContent,
  Text,
} from "mdast";

type AnyContent = RootContent | PhrasingContent;

type FoldState = "+" | "-";

interface ParsedCallout {
  type: string;
  fold: FoldState | null;
  title: string;
  body: RootContent[];
}

const ICONS: Record<string, string> = {
  note: "icon-[lucide--notebook-pen]",
  info: "icon-[lucide--info]",
  tip: "icon-[lucide--lightbulb]",
  success: "icon-[lucide--circle-check]",
  question: "icon-[lucide--circle-help]",
  warning: "icon-[lucide--triangle-alert]",
  danger: "icon-[lucide--octagon-alert]",
  failure: "icon-[lucide--circle-x]",
  bug: "icon-[lucide--bug]",
  example: "icon-[lucide--list-checks]",
  quote: "icon-[lucide--quote]",
};
const DEFAULT_ICON = "icon-[lucide--info]";
const CHEVRON_ICON = "icon-[lucide--chevron-down]";
const CALLOUT_MARKER =
  /^\[!([A-Za-z0-9-]+)([+-])?\](?:([+-])(?=\s|$))?\s*(.*)$/;

export default function remarkCallouts(): (tree: Root) => void {
  return (tree) => {
    tree.children = transformChildren(tree.children);
  };
}

function transformChildren(children: RootContent[]): RootContent[] {
  const nodes: RootContent[] = [];
  for (const child of children) {
    if (child.type === "blockquote") {
      const callout = parseCallout(child);
      if (callout) {
        nodes.push(...callout.nodes);
      } else {
        child.children = transformChildren(
          child.children,
        ) as typeof child.children;
        nodes.push(child);
      }
    } else {
      nodes.push(child);
    }
  }
  return nodes;
}

function parseCallout(blockquote: Blockquote): { nodes: RootContent[] } | null {
  const parsed = parseMarker(blockquote);
  if (!parsed) return null;
  const parsedCallout: ParsedCallout = parsed;
  const { type, fold, title } = parsedCallout;
  const icon = ICONS[type] ?? DEFAULT_ICON;
  const label = escapeHtml(title || labelFor(type));
  const iconHtml = `<span class="callout-icon ${icon}" aria-hidden="true"></span>`;
  const headHtml = `${iconHtml}<span class="callout-label">${label}</span>`;
  const className = `callout${fold ? " callout-fold" : ""} callout-${type}`;
  const nodes: RootContent[] = [];
  if (fold) {
    nodes.push(
      html(
        `<details class="${className}" role="note"${
          fold === "+" ? " open" : ""
        }>`,
      ),
      html(
        `<summary class="callout-title">${headHtml}<span class="callout-chevron ${CHEVRON_ICON}" aria-hidden="true"></span></summary>`,
      ),
    );
  } else {
    nodes.push(html(`<div class="${className}" role="note">`));
    nodes.push(html(`<div class="callout-title">${headHtml}</div>`));
  }
  nodes.push(...parsedCallout.body);
  nodes.push(html(fold ? `</details>` : `</div>`));
  return { nodes };
}

function parseMarker(blockquote: Blockquote): ParsedCallout | null {
  const first = blockquote.children[0];
  if (!first || first.type !== "paragraph") return null;
  const head = first.children[0];
  if (!head || head.type !== "text") return null;
  const value = (head as Text).value;
  const firstLine = value.split("\n")[0];
  const match = firstLine.match(CALLOUT_MARKER);
  if (!match) return null;
  let type = match[1].toLowerCase();
  const foldRaw = match[2] ?? match[3];
  let fold: FoldState | null =
    foldRaw === "+" || foldRaw === "-" ? foldRaw : null;
  if (type.endsWith("+") || type.endsWith("-")) {
    const suffix = type.slice(-1);
    if (!fold && (suffix === "+" || suffix === "-")) {
      fold = suffix;
    }
    type = type.slice(0, -1);
  }
  if (!type) {
    type = "note";
  }
  const fullText = first.children.map(plainText).join("");
  const titleStart = firstLine.length - match[4].length;
  const newline = fullText.indexOf("\n", titleStart);
  const title = (
    newline === -1
      ? fullText.slice(titleStart)
      : fullText.slice(titleStart, newline)
  ).trim();
  const restText = newline === -1 ? "" : fullText.slice(newline + 1).trim();
  const body: RootContent[] = [];
  if (restText) {
    body.push(paragraph(restText));
  }
  body.push(...transformChildren(blockquote.children.slice(1)));
  return { type, fold, title, body };
}

function plainText(node: AnyContent): string {
  if (node.type === "text") return (node as Text).value;
  if (node.type === "break") return " ";
  if (
    "value" in node &&
    typeof (node as { value?: unknown }).value === "string"
  ) {
    return (node as { value: string }).value;
  }
  if ("children" in node) {
    return (node as { children: AnyContent[] }).children
      .map(plainText)
      .join("");
  }
  return "";
}

function labelFor(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function html(value: string): Html {
  return { type: "html", value };
}

function paragraph(text: string): Paragraph {
  return { type: "paragraph", children: [{ type: "text", value: text }] };
}
