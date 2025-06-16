import { useState,useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://gszstjwhasiwinfmslts.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzenN0andoYXNpd2luZm1zbHRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NDAwNDksImV4cCI6MjA2MzIxNjA0OX0.TMzO-M2SroZKrWOkoU44-UTEPI1mR275Hsh_KIXVCTI')

export default function DB() {
  const [dataAPI, setDataAPI] = useState([])

  //dataAPI : state name
  //setDataAPI : how to fill data into dataAPI

  // useEffect(() => {
  //   API()
  // }, []);

  async function API() {
    const { data, error } = await supabase
          .from('jualan')
          .select('id,task')
    setDataAPI(data)
  }

  function APIManual() {
    fetch("hhttps://gszstjwhasiwinfmslts.supabase.co/rest/v1/todos", {
      method: 'GET',
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzenN0andoYXNpd2luZm1zbHRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NDAwNDksImV4cCI6MjA2MzIxNjA0OX0.TMzO-M2SroZKrWOkoU44-UTEPI1mR275Hsh_KIXVCTI',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzenN0andoYXNpd2luZm1zbHRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NDAwNDksImV4cCI6MjA2MzIxNjA0OX0.TMzO-M2SroZKrWOkoU44-UTEPI1mR275Hsh_KIXVCTI',
      }
    })
    .then(response => {
      return response.json();
    })
    .then(data => setDataAPI(data))
    .catch(error => console.error(error));
  }

  return (
    <>
      <button onClick={API}>Get API Data</button>
      
      <ul>
      {dataAPI.map((item, index) => 
        <li key={index}>{item.task}</li>
      )}
      </ul>
    </>
  )
}
