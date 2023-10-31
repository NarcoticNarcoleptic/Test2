
import CreateCollectionComponent from './createcollection';
import SendGitHubRepo from './sendgithubrepo'
import FileUploadTest from './insert'




export default function Sidebar() {
    return (
      <div className="w-1/3 bg-gray-200 p-4">
     <SendGitHubRepo/>
     <FileUploadTest/>
      <CreateCollectionComponent/>
      </div>
    );
  }