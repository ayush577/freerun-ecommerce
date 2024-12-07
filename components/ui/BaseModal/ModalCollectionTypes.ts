// Define a type for modal collection identifiers
export type ModalCollectionIds =  'LoginForm' | 'TestModal1' | 'TestModal2' | 'TestModal3' | 'TestModal4';

// Define a type for a record where keys are ModalCollectionIds and values are JSX Elements
export type ModalCollectionData = Record<ModalCollectionIds, JSX.Element>;
