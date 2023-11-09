import { useRouter } from "next/router";
const MyComponent = () => {
  const router = useRouter();
  const handleRefresh = () => {
    router.reload();
  };
  return (
    <div>
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
};
export default MyComponent;
