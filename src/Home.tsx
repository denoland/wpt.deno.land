import { h, tw } from "../deps.ts";
import { Ratio } from "./Data.tsx";
import { Test } from "./data.ts";
import { Footer } from "./Footer.tsx";
import { Header } from "./Header.tsx";

export function Home(
  props: {
    latest: string;
    latestTests: Test[];
    releaseName: string;
    releaseCommit: string;
    releaseTests: Test[];
  },
) {
  let passedLatest = 0;
  let totalLatest = 0;

  for (const test of props.latestTests) {
    for (const c of test.cases) {
      passedLatest += c.passed ? 1 : 0;
      totalLatest++;
    }
  }

  let passedRelease = 0;
  let totalRelease = 0;

  for (const test of props.releaseTests) {
    for (const c of test.cases) {
      passedRelease += c.passed ? 1 : 0;
      totalRelease++;
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
      <div class={tw`mt-6 border-t border-gray-200 pt-6`}>
        <p>
          Ran <span class={tw`font-bold`}>{props.latestTests.length}</span>{" "}
          WPT tests for latest <span class={tw`font-bold`}>main</span> commit
          {" "}
          <a
            href={`https://github.com/denoland/deno/commits/${props.latest}`}
            class={tw`text-blue-500 hover:underline`}
          >
            {props.latest.slice(0, 8)}
          </a>.
        </p>
        <p class={tw`mt-4`}>
          <Ratio passed={passedLatest} total={totalLatest} />
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
      <div class={tw`mt-6 border-t border-gray-200 pt-6`}>
        <p>
          Ran <span class={tw`font-bold`}>{props.releaseTests.length}</span>
          {" "}
          WPT tests for <span class={tw`font-bold`}>{props.releaseName}</span>
          {" "}
          release{" "}
          <a
            href={`https://github.com/denoland/deno/commits/${props.releaseCommit}`}
            class={tw`text-blue-500 hover:underline`}
          >
            {props.releaseCommit.slice(0, 8)}
          </a>.
        </p>
        <p class={tw`mt-4`}>
          <Ratio passed={passedRelease} total={totalRelease} />
        </p>
        <p class={tw`mt-4`}>
          <a
            href={`/${props.releaseCommit}`}
            class={tw`text-blue-500 hover:underline`}
          >
            View detailed data for {props.releaseName} release ➔
          </a>
        </p>
      </div>
      <Footer />
    </div>
  );
}
