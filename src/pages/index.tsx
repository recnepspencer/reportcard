import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const {data: studentData, isLoading} = api.reportcard.getStudent.useQuery();
  const {data: reportcardData} = api.reportcard.getReportcard.useQuery();

  if (isLoading) {
    return <>Loading...</>
  }

  const student = studentData?.name || "No student found";
  const reportcards = reportcardData || [];

  console.log(reportcardData)

  return (
    <>
      <Head>
        <title>Report Card</title>
        <meta name="description" content="Report Card" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>{student}'s Report Card</h1>
        {reportcards.map((reportcard) => (
          <div key={reportcard.id}>
            <ul>
              {reportcard.classes.map((data) => (
                <li key={data.id}>
                  {data.className}: {data.grade}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </main>
    </>
  );
};

export default Home
