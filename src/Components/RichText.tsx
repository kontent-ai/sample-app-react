import React from 'react';
import {
  Elements,
} from '@kontent-ai/delivery-sdk';
import { PortableText, toPlainText } from '@portabletext/react';
import { IPortableTextItem, browserParse, resolveTable, transform } from '@pokornyd/kontent-ai-rich-text-parser';

interface RichTextProps {
  element: Elements.RichTextElement;
  className?: string;
}

const RichText: React.FC<RichTextProps> = (props) => {

  const portableTextComponents = {
    types: {
      component: (block: any) => {
        const item = props.element.linkedItems.find(item => item.system.codename === block.value.component._ref);
        return <div>{item?.elements.text_element.value}</div>;
      },
      table: ({ value }: any) => {
        let tableString = resolveTable(value, toPlainText);
        return <>{tableString}</>;
      }
    },
    marks: {
      link: ({ value, children }: any) => {
        const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
        return (
          <a href={value?.href} target={target} rel={value?.rel} title={value?.title} data-new-window={value['data-new-window']}>
            {children}
          </a>
        )
      },
      internalLink: ({ value, children }: any) => {
        const item = props.element.linkedItems.find(item => item.system.id === value.reference._ref);
        return (
          <a href={"https://somerandomwebsite.xyz/" + item?.system.codename}>
            {children}
          </a>
        )
      }
    }
  }

  const parsedTree = browserParse(props.element.value);
  const portableText = transform(parsedTree);

  return (
    <div className={props.className}>
      {/* <PortableText value={portableText} components={portableTextComponents} /> */}
    </div>
  );
};

export default RichText;
