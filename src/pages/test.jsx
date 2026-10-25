import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

const MyComponent = () => {
  const router = useRouter();
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <Button onClick={() => router.reload()}>Refresh</Button>
    </div>
  );
};
export default MyComponent;
