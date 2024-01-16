interface InvoiceDetailsProps {
  params: {
    id: string;
  };
}

export default function InvoiceDetails({ params }: InvoiceDetailsProps) {
  return (
    <div>
      <h1>Invoice # {params.id} details</h1>
    </div>
  );
}
