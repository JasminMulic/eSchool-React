export default function ErrorPage(error) {
  return (
    <div className="text-center">
      <h1 className="text-danger">{error}</h1>
    </div>
  );
}
