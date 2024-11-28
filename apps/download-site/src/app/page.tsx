import Article from './_article';
import Demo from '@/components/Demo';

export default function Home() {
  return (
    <>
      <div>Hello World!</div>
      <button
        id="click"
        data-click-trace-action={'click_fullscreen'}
        data-click-trace-params={JSON.stringify({ value: 'fullscreen' })}
      >
        Click me
      </button>
      <a href="https://www.baidu.com" target='_blank'>baidu</a>
      <Demo />
      {/* <iframe src="https://www.baidu.com" /> */}
      <Article />
    </>
  );
}
