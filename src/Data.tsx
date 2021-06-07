import { Fragment, h, tw } from "../deps.ts";
import { Test, TestCase } from "./data.ts";
import { Footer } from "./Footer.tsx";
import { Header } from "./Header.tsx";

interface Folder {
  total: number;
  passed: number;
  children: number;
}

interface DetailedTest extends Test {
  total: number;
  passed: number;
}

export function Data(
  props: { filtered: Test[]; commit: string; filter: string },
) {
  const { filtered, commit, filter } = props;

  const folders: Record<string, Folder> = {};
  const tests: Record<string, DetailedTest> = {};

  for (const test of filtered) {
    let rest = test.file.substring(filter.length);
    if (rest[0] == "/") rest = rest.substring(1);
    const split = rest.split("/");
    const key = split[0];
    if (split.length > 1) {
      if (folders[key] === undefined) {
        folders[key] = { total: 0, passed: 0, children: 0 };
      }
      folders[key].passed += test.cases.filter((c) => c.passed).length;
      folders[key].total += test.cases.length;
      folders[key].children++;
    } else {
      if (folders[key] !== undefined) {
        throw new TypeError("UNREACHABLE!");
      }
      tests[key] = {
        file: test.file,
        name: test.name,
        cases: test.cases,
        passed: test.cases.filter((c) => c.passed).length,
        total: test.cases.length,
      };
    }
  }

  let passed = 0;
  let total = 0;

  for (const key in folders) {
    passed += folders[key].passed;
    total += folders[key].total;
  }
  for (const key in tests) {
    passed += tests[key].passed;
    total += tests[key].total;
  }

  return (
    <div class={tw`max-w-screen-md mx-auto p-6`}>
      <Header />
      <p class={tw`mt-8`}>{filter}</p>
      <p class={tw`mt-4`}>
        <span class={tw`font-bold`}>{filtered.length}</span>{" "}
        matching WPT tests for commit{" "}
        <a
          href={`https://github.com/denoland/deno/commits/${commit}`}
          class={tw`text-blue-500 hover:underline`}
        >
          {commit.slice(0, 8)}
        </a>.
      </p>
      <p class={tw`mt-4`}>
        <Ratio passed={passed} total={total} />
      </p>
      <div class={tw`mt-8`}>
        {tests[""] !== undefined
          ? tests[""].cases.map((c) => <TestCaseTile case={c} />)
          : <>
            {Object.entries(folders).map(([key, folder]) =>
              <FolderTile
                key={key}
                name={key}
                commit={commit}
                filter={filter}
                folder={folder}
              />
            )}
            {Object.entries(tests).map(([key, test]) =>
              <TestTile
                key={key}
                name={key}
                commit={commit}
                test={test}
              />
            )}
          </>}
      </div>
      <Footer />
    </div>
  );
}

function FolderTile(
  props: {
    name: string;
    commit: string;
    filter: string;
    folder: Folder;
  },
) {
  return (
    <div class={tw`border border-gray-200 w-full mb-2 p-2`}>
      <h4>
        <p>
          <a
            href={`/${props.commit}${props.filter}${
              props.filter.endsWith("/") ? "" : "/"
            }${props.name}`}
            class={tw`text-blue-500 hover:underline`}
          >
            {props.name}
          </a>{" "}
          /
        </p>
        <p class={tw`text-gray-700 text-sm mt-1`}>
          <Ratio passed={props.folder.passed} total={props.folder.total} />
        </p>
      </h4>
    </div>
  );
}

function TestTile(props: { name: string; commit: string; test: DetailedTest }) {
  const { name, commit, test } = props;

  return (
    <div class={tw`border border-gray-200 w-full mb-2 p-2`}>
      <h4>
        <p>
          <a
            href={`/${props.commit}${test.file}`}
            class={tw`text-blue-500 hover:underline`}
          >
            {props.name}
          </a>
        </p>
        <p class={tw`text-gray-700 text-sm mt-1`}>
          <Ratio passed={test.passed} total={test.total} />
        </p>
      </h4>
    </div>
  );
}

function TestCaseTile(props: { case: TestCase }) {
  return (
    <div
      class={tw`border ${
        props.case.passed ? "border-green-500" : "border-red-500"
      } w-full mb-1 py-1 px-2`}
    >
      {props.case.passed ? "✅" : "❌"} {props.case.name}
    </div>
  );
}

export function Ratio(props: { passed: number; total: number }) {
  const { passed, total } = props;
  const none = passed === 0 && total === 0;
  const percentPassed = none ? 0 : passed / total * 100;
  return (
    <>
      <span class={tw`font-bold`}>{none ? "no" : `${passed} / ${total}`}</span>
      {" "}
      test cases pass ({percentPassed.toFixed(1)}%) {none && "(suite crashed)"}
      <div class={tw`flex`}>
        <div
          class={tw`h-1 mt-1 w-full bg-green-300`}
          style={{ width: `${percentPassed}%` }}
        />
        <div
          class={tw`h-1 mt-1 w-full bg-red-300`}
          style={{ width: `${100 - percentPassed}%` }}
        />
      </div>
    </>
  );
}
