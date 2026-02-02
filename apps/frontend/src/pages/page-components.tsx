import Text from "../components/text";
import Icon from "../components/icon";
import Badge from "../components/badge";
import Button from "../components/button";
import ButtonIcon from "../components/button-icon";
import InputText from "../components/input-text";
import InputCheckbox from "../components/input-checkbox";
import Card from "../components/card";
import Container from "../components/container";
import Skeleton from "../components/skeleton";
import CheckIcon from "../assets/icons/Check-Regular.svg?react";
import PencilIcon from "../assets/icons/PencilSimple-Regular.svg?react";
import PlusIcon from "../assets/icons/Plus-Regular.svg?react";
import SpinnerIcon from "../assets/icons/spinner.svg?react";
import SquareIcon from "../assets/icons/Square-Regular.svg?react";
import TrashIcon from "../assets/icons/Trash-Regular.svg?react";
import XIcon from "../assets/icons/X-Regular.svg?react";

export default function PageComponents() {
  return (
    <Container>
      <div className="grid gap-10">
        <div className="flex flex-col gap-1">
          <Text className="text-green-base" variant={"body-md"}>
            Olá mundo!
          </Text>
          <Text className="text-green-base" variant={"body-md-bold"}>
            Olá mundo!
          </Text>
          <Text className="text-green-base" variant={"body-sm-bold"}>
            Olá mundo!
          </Text>
        </div>
        <div className="flex gap-1">
          <Icon svg={CheckIcon} />
          <Icon svg={TrashIcon} />
          <Icon svg={PencilIcon} />
          <Icon svg={PlusIcon} />
          <Icon svg={SpinnerIcon} animate />
          <Icon svg={SquareIcon} />
          <Icon svg={XIcon} />
        </div>

        <div className="flex gap-1">
          <Badge variant={"primary"}>2 de 5</Badge>
          <Badge variant={"secondary"}>5</Badge>
          <Badge loading>5</Badge>
        </div>

        <div>
          <Button icon={PlusIcon}>Nova Tarefa</Button>
          <Button icon={PlusIcon} handling>
            Criando...
          </Button>
        </div>

        <div className="flex gap-1">
          <ButtonIcon icon={TrashIcon} />
          <ButtonIcon icon={TrashIcon} variant={"secondary"} />
          <ButtonIcon icon={TrashIcon} variant={"tertiary"} />
          <ButtonIcon icon={TrashIcon} handling />
        </div>

        <div>
          <InputText />
        </div>

        <div>
          <InputCheckbox />
          <InputCheckbox loading />
        </div>

        <div>
          <Card size={"md"}>Ola mundo</Card>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6 w-96" />
        </div>
      </div>
    </Container>
  );
}
