import FileErrorWarning from "./@file_error_warning/page";

export default async function Home() {
  return (
    <div>
      <h1> File Upload</h1>
      <FileErrorWarning />
    </div>
  );
}
