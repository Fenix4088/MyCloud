import { withRedirect } from '../../hoc/withRedirect';

const Main = () => {
  return (
    <div>
      <h1>Main page</h1>
    </div>
  );
};

export default withRedirect(Main, false);