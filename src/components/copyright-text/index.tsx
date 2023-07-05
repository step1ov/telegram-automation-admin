import Link from "next/link";

const CopyrightText = () =>
    <>
        <Link href={"#"} rel="noreferrer">Telegram Automation</Link>{'. '}
        © {new Date().getFullYear()}
    </>

export default CopyrightText
