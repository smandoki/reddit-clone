import PageContent from "../Layout/PageContent";
import NewPostForm from "../Posts/NewPostForm";

type Props = {};

function Submit({}: Props) {
  return (
    <PageContent>
      <>
        <div className="">
          <h2 className="py-[14px] border-b border-white font-medium">
            Create a post
          </h2>
          <NewPostForm />
        </div>
      </>
      <>{/* AboutCommunity */}</>
    </PageContent>
  );
}

export default Submit;
