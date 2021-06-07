import { h, tw } from "../deps.ts";
import { Ratio } from "./Data.tsx";
import { Test } from "./data.ts";
import { Footer } from "./Footer.tsx";
import { Header } from "./Header.tsx";

export function Home(props: { latest: string; latestTests: Test[] }) {
  let passed = 0;
  let total = 0;

  for (const test of props.latestTests) {
    for (const c of test.cases) {
      passed += c.passed ? 1 : 0;
      total++;
    }
  }

  return (
    <div class={tw`max-w-screen-md mx-auto p-6`}>
      <Header />
      <p class={tw`mt-8`}>
        This page displays the status of all{" "}
        <a
          href="https://web-platform-tests.org/"
          class={tw`text-blue-500 hover:underline`}
        >
          Web Platform Tests
        </a>{" "}
        that are run in Deno CI. The WPT suite is shared between all browser
        vendors (Chrome, Firefox, Safari), and is used to check for
        compatibility between engines. It ensures that web APIs behave the same
        across different browsers.
      </p>
      <div class={tw`mt-4`}>
        <p class={tw`mt-4`}>
          Ran <span class={tw`font-bold`}>{props.latestTests.length}</span>{" "}
          WPT tests for latest `main` commit{" "}
          <a
            href={`https://github.com/denoland/deno/commits/${props.latest}`}
            class={tw`text-blue-500 hover:underline`}
          >
            {props.latest.slice(0, 8)}
          </a>.
        </p>
        <p class={tw`mt-4`}>
          <Ratio passed={passed} total={total} />
        </p>
        <p class={tw`mt-4`}>
          <a
            href={`/${props.latest}`}
            class={tw`text-blue-500 hover:underline`}
          >
            View detailed data for latest commit ➔
          </a>
        </p>
      </div>
      <Footer />
    </div>
  );
}
