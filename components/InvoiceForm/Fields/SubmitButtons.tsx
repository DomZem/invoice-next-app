import { Button } from '@/components/UI/Button';
import { SheetClose } from '@/components/UI/Sheet';

interface SubmitButtonsProps {
  variant: 'create' | 'update';
  isPending: boolean;
  onSaveSubmit: () => void;
}

export default function SubmitButtons({
  variant,
  isPending,
  onSaveSubmit,
}: SubmitButtonsProps) {
  return (
    <div className="flex-shrink-0">
      <div className="h-16 w-full bg-shadow"></div>
      <div
        className={`flex items-center gap-2 px-6 py-[23px] ${
          variant === 'create'
            ? 'justify-end md:justify-between'
            : 'justify-end'
        }`}
      >
        <Button
          type="button"
          className="px-[13px] md:px-6"
          variant="secondary"
          asChild
        >
          <SheetClose>
            {variant === 'create' && 'Discard'}
            {variant === 'update' && 'Cancel'}
          </SheetClose>
        </Button>

        <div className="flex items-center gap-2">
          {/* If user submit that button the status will be 'DRAFT' */}
          {variant === 'create' && (
            <Button
              onClick={onSaveSubmit}
              disabled={isPending}
              className="px-[13px] md:px-6"
              type="submit"
              variant="outline"
            >
              Save as Draft
            </Button>
          )}

          {/* If user submit that button the status will be 'PENDING' */}
          <Button
            type="submit"
            className="px-[13px] md:px-6"
            disabled={isPending}
          >
            {variant === 'create' && 'Save & Send'}
            {variant === 'update' && 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}
