import { cn } from '@mono/utils';
import Image, { ImageProps } from 'next/image';
import Link from 'next/link';

export interface IRoundImageProps extends ImageProps {
	url: string;
}

const RoundImage = (props: IRoundImageProps) => {
	const { url, src, alt, width = 240, height = 240, className, ...reset } = props;
	const Container = (
		<Image
			className={cn('rounded-md w-full h-full', className)}
			src={src}
			alt={alt}
			width={width}
			height={height}
			{...reset}
		/>
	);
	if (!url) {
		return Container;
	}
	return (
		<Link href={url} className={cn('hover:opacity-80', className)}>
			{Container}
		</Link>
	);
};

export default RoundImage;
