import { useEffect, useState } from "react"
import {
  linkIcon,
  loader,
  copy,
  logo,
  tick
} from '../assets/index.js'

import { useLazyGetSummaryQuery } from "../services/article.js"
const Demo = () => {
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem("articles"))
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage)
    }
  }, [])
  const [allArticles, setAllArticles] = useState([])
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery()
  const [copied, setCopied] = useState("");
  const [article, setArticle] = useState({
    url: "",
    summary: ""
  })
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data } = await getSummary({
      articleURL: article.url
    })
    if (data?.summary) {
      const newArticle = {
        ...article, summary: data.summary
      }
      const updatedAllArticles = [...allArticles, newArticle];
      setAllArticles(updatedAllArticles)
      setArticle(newArticle)
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles))
      console.log(data);
    }
  }
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl)
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000)
  }
  return (
    <section className="mt-16 w-full max-w-xl">
      {/* Search */}
      <div className="flex flex-col w-full gap-2">
        <form className="relative flex justify-center items-center" onSubmit={(e) => { handleSubmit(e) }}>
          <img alt="link_icon" src={linkIcon} className="absolute left-0 my-2 ml-3 w-5" />
          <input type="url" placeholder="Enter a URL" value={article.url} onChange={(e) => {
            setArticle({ ...article, url: e.target.value })
          }} required className="url_input peer" />
          <button type="submit" className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"> ↵ </button>

        </form>
        {/* Browsed URL History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((article, index) => (
            <div key={`link-${index}`} onClick={() => setArticle(article)} className="link_card ">
              <div className="copy_btn" onClick={() => handleCopy(article.url)}> <img src={copied === article.url ? tick : copy } alt="copy_btn" className="w-[40%] h-[40%] object-contain" /></div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">{article.url}</p>
            </div>
          ))}

        </div>

      </div>
      {/* Display Results */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (<img src={loader} alt="load_svg" className="w-20 h-20 object-contain" />) : error ? (<p className="font-inter font-bold text-center text-bold">Well that wasn't supposed to happen... <br />
          <span className="font-satoshi font-normal text-red-500">{error?.data?.error}</span>
        </p>) : (article.summary && (<div className="flex flex-col gap-3">

          <h2 className="font-satoshi font-bold text-gray-600 text-xl">Article <span className="blue_gradient">Summary</span></h2>

          <div className="summary_box ">
            <p className="font-inter font-medium text-sm text-gray-700">
              {article.summary}
            </p>
          </div>
        </div>))}
      </div>

    </section >
  )
}

export default Demo