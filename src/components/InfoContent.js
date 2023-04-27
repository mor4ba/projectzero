import { useRouter } from "next/router";

export default function InfoContent({ classes }) {
  const router = useRouter();
  const { pathname } = router;

  switch (pathname) {
    case "/":
      return <div className={`p-4 ${classes}`}>Frontpage.</div>;

    case "/places":
      return <div className={`p-4 ${classes}`}>all Places</div>;

    case `/places/[id]`:
      return <div className={`p-4 ${classes}`}>Place Single</div>;
  }
}
