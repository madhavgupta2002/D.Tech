import Head from 'next/head';
import { answers } from '../../public/js/answers';

export default function PYQSolutions() {
  const parseKey = (key) => {
    const [code, ...rest] = key.split(' ');
    const subjectName = rest.slice(0, -2).join(' ');
    const year = rest.slice(-2).join(' ');

    return { code, subjectName, year };
  };

  return (
    <>
      <Head>
        <title>DTU PYQ Solutions</title>
      </Head>

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-10">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">PYQ Solutions</h1>
          <p className="mt-2 text-muted-foreground">Solved previous year question papers (open in a new tab).</p>
        </header>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(answers).map(([key, value]) => {
            const { code, subjectName, year } = parseKey(key);
            return (
              <li key={key}>
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full rounded-lg border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/40"
                >
                  <span className="block text-xs font-semibold text-primary">{code}</span>
                  <span className="mt-1 block font-semibold">{subjectName}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{year}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
