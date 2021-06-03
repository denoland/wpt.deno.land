export interface Test {
  file: string;
  name: string | null;
  cases: TestCase[];
}

export interface TestCase {
  name: string;
  passed: boolean;
}

export async function wptDataForCommit(commit: string): Promise<Test[]> {
  const dataUrl = `https://dl.deno.land/wpt/${commit}.json`;
  const data = await fetch(dataUrl).then((r) => r.json());
  return data;
}
