import Article from './_article';

export default function Home() {
  return (
    <>
      <div>Hello World!</div>
      <button id="click">Click me</button>
      <a href="https://www.baidu.com" target='_blank'>baidu</a>
      <iframe src="https://www.baidu.com" />
      <Article />
    </>
  );
}
