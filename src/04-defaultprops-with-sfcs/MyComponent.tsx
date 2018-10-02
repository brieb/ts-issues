/**
 * defaultProps for function SFCs are inconsistent with class components.
 * 
 * typescript@3.1.1
 * @types/react@16.4.14
 * @types/prop-types@15.5.6
 */
interface Props { text: string }

function BackButton({ text }: Props) {
  return <div/>
}

BackButton.defaultProps = { text: 'Go Back' };

// error TS2322: Type '{}' is not assignable to type 'Props'.
//   Property 'text' is missing in type '{}'.
<BackButton />
