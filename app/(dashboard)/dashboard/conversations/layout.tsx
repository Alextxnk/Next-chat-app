import getConversations from '@/app/actions/getConversations';
import getUsers from '@/app/actions/getUsers';
import Sidebar from '@/app/components/sidebar/Sidebar';
import ConversationList from './components/ConversationList';

export default async function ConversationsLayout({
   children
}: {
   children: React.ReactNode;
}) {
   const conversations = await getConversations();
   const users = await getUsers();

   return (
      <>
         <ConversationList
            users={users}
            title='Сообщения'
            initialItems={conversations}
         />
         {children}
      </>
   );
}
