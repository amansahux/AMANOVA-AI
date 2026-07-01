import { useParams } from 'react-router-dom'

const SpecificChat = () => {
    const {chatId} = useParams()
    console.log(chatId);
    
    // const {data,isLoading,error}=useGetSpecificChatMessagesQuery(chatId)
    
  return (
    <div>SpecificChat</div>
  )
}

export default SpecificChat