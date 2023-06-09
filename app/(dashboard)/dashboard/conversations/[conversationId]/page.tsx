import getConversationById from '@/app/actions/getConversationById';
import getMessages from '@/app/actions/getMessages';

import Header from './components/Header';
import Body from './components/Body';
import Form from './components/Form';
import EmptyState from '@/app/components/EmptyState';

interface IParams {
   conversationId: string;
}

const ChatId = async ({ params }: { params: IParams }) => {
   const conversation = await getConversationById(params.conversationId);
   const messages = await getMessages(params.conversationId);

   if (!conversation) {
      return (
         <div className='lg:pl-80'>
            <div className='h-full flex flex-col'>
               <EmptyState />
            </div>
         </div>
      );
   }

   return (
      <>
         {/* <div className='lg:pl-80 relative'>
            <div className='h-full flex flex-col'>
               <Header conversation={conversation} />
               <Body initialMessages={messages} />
               <Form />
            </div>
         </div> */}
         <div className='lg:pl-[130px] flex flex-col h-screen fixed lg:right-16 top-0 pt-16 lg:w-3/4'>
            <div className='w-full text-center border-b border-grey top-0'>
               <Header conversation={conversation} />
            </div>
            <main className='flex-1 overflow-y-scroll'>
               <Body initialMessages={messages} />
            </main>
            <footer className='w-full text-center border-t border-grey  bottom-0'>
               <Form />
            </footer>
         </div>
      </>
   );
};

export default ChatId;
