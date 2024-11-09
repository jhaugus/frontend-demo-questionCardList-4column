import Image from "next/image";
import styles from "./page.module.css";
import QuestionBankList from "@/components/QuestionBankList";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import Title from "antd/es/typography/Title";
import { Divider, Flex, message } from "antd";
import Link from "next/link";

export default async function Home() {
  let questionBankList = [];
  try {
    const res = await listQuestionBankVoByPageUsingPost({
      pageSize: 16,
      sortField: "createTime",
      sortOrder: "descend",
    });
    questionBankList = res.data.records ?? [];
  } catch (e) {
    // message.error("获取题库列表失败，" + e.message);
    questionBankList = [];
  }


  return (

    <div id="home" className={styles.page}>
    <main className={styles.main}>
      <Flex justify="space-between" align="center">
        <Title level={3}>最新题库</Title>
        <Link href={"/banks"} style={{ color: '#1677ff' }}>查看更多</Link>
      </Flex>

        <QuestionBankList questionBankList={questionBankList} />
      </main>
    </div>
  );
}
