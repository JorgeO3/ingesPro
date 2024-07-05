interface ColumnHeaderProps {
  header: string;
}

export const ColumnHeader = ({ header }: ColumnHeaderProps) => (
  <div className="text-center">{header}</div>
);
