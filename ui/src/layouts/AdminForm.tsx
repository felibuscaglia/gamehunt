import Button from "components/Button";

interface IProps {
  onGoBackBtnClick: () => void;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
  entityName: string;
  loading: boolean;
}

const AdminFormLayout: React.FC<IProps> = ({
  onGoBackBtnClick,
  onSubmit,
  entityName,
  children,
  loading,
}) => {
  return (
    <div>
      <button
        className="underline text-primary-brand-color"
        onClick={onGoBackBtnClick}
      >
        &#8592; Go back
      </button>
      <form onSubmit={onSubmit} className="flex flex-col items-center gap-8">
        <h3 className="text-2xl font-bold text-center">New {entityName}</h3>
        {children}
        <div className="w-1/2">
          <Button type="submit" text="Create" loading={loading} />
        </div>
      </form>
    </div>
  );
};

export default AdminFormLayout;
