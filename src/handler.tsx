import {
  ComponentType,
  getStyleTag,
  h,
  renderToString,
  router,
  setup,
  tw,
  virtualSheet,
} from "../deps.ts";
import { Data } from "./Data.tsx";
import { wptDataForCommit } from "./data.ts";
import { Home } from "./Home.tsx";

export const handler = router({
  "/": async () => {
    const latest = await fetch("https://dl.deno.land/wpt-latest.txt")
      .then((r) => r.text()).then((t) => t.trim());
    const body = render("Deno WPT Compat", () => <Home latest={latest} />);
    return new Response(body, {
      headers: {
        "content-type": "text/html",
      },
    });
  },
  "/:commit/:filter*": async (_req, { params }) => {
    const commit = params.commit;
    if (commit == "favicon.ico") {
      return new Response("not found", { status: 404 });
    }
    const filter = Array.isArray(params.filter) ? `/${params.filter.join("/")}/` : "/";

    const tests = await wptDataForCommit(commit);
    const filtered = tests.filter((test) => test.file.startsWith(filter));

    const body = render(`${filter} ${commit.slice(0, 8)} | Deno WPT`, () => {
      return <Data commit={commit} filter={filter} filtered={filtered} />;
    });
    return new Response(body, {
      headers: {
        "content-type": "text/html",
      },
    });
  },
}, (req: Request) => {
  return Response.redirect(new URL("/", req.url).href);
});

const sheet = virtualSheet();
setup({ sheet });

function render(title: string, Page: ComponentType): string {
  sheet.reset();
  const page = (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="https://deno.land/favicon.ico" />
        <title>{title}</title>
      </head>
      <body class={tw`bg-gray-100`}>
        <Page />
      </body>
    </html>
  );
  const body = renderToString(page);
  const styleTag = getStyleTag(sheet);
  return `<!DOCTYPE html>${body.replace("</head>", styleTag + "</head>")}`;
}
