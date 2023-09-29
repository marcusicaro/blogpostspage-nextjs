export default function FailedComponentLoad({ error }: any) {
  return (
    <div className='w-full h-screen align-middle items-center justify-center flex'>
      <p>Erro carregando os dados: {error.message}</p>
    </div>
  );
}
