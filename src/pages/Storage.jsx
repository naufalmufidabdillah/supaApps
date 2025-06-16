import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://gszstjwhasiwinfmslts.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzenN0andoYXNpd2luZm1zbHRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NDAwNDksImV4cCI6MjA2MzIxNjA0OX0.TMzO-M2SroZKrWOkoU44-UTEPI1mR275Hsh_KIXVCTI')

export default function Storage() {
  const [imgUrls, setImgUrls] = useState([])

  async function uploadFile(event) {
    const dataFile = event.target.files[0]
    if (!dataFile) return

    await supabase
      .storage
      .from('macron')
      .upload('public/' + dataFile.name, dataFile, {
        cacheControl: '3600',
        upsert: false
      })
  }

  async function showFiles() {
    // List all files in the 'public' folder
    const { data, error } = await supabase
      .storage
      .from('macron')
      .list('public', { limit: 100, offset: 0 })

    if (error) {
      console.log(error)
      return
    }

    // Get public URLs for all files
    const urls = data
      .filter(item => item.name) // filter out folders
      .map(item => {
        const { data: urlData } = supabase
          .storage
          .from('macron')
          .getPublicUrl('public/' + item.name)
        return urlData.publicUrl
      })

    setImgUrls(urls)
  }

  return (
    <>
      <input type="file" onChange={uploadFile} />
      <br /><br />
      <button onClick={showFiles}>Show File</button>
      <br /><br />
      {imgUrls.map(url => (
        <img key={url} src={url} alt="Uploaded" style={{maxWidth: 400, marginBottom: 10}} />
      ))}
    </>
  )
}