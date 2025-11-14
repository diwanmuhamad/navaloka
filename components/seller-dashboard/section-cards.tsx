import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { fetchArtWorkRecords } from "@/store/artWorkSlice";
import { toast } from "sonner";

export function SectionCards() {
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [totalItemsListed, setTotalItemsListed] = useState(0);
  const [totalItemsSold, setTotalItemsSold] = useState(0);

  useEffect(() => {
    if (!loading && user) {
      // Fetch total items listed
      const paramsListed = { creator_id: user.id };
      const result = dispatch(fetchArtWorkRecords(paramsListed)).unwrap();
      result
        .then((data) => {
          setTotalItemsListed(data.length);
        })
        .catch((error) => {
          toast.error("Error fetching total items listed:", error);
        });
      // Fetch total items sold
      const paramsSold = { creator_id: user.id, status: "sold" };
      const resultSold = dispatch(fetchArtWorkRecords(paramsSold)).unwrap();
      resultSold
        .then((data) => {
          setTotalItemsSold(data.length);
        })
        .catch((error) => {
          toast.error("Error fetching total items sold:", error);
        });
    }
  }, [user]);
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            $1,250.00
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Keep growing your revenue.
          </div>
          <div className="text-muted-foreground">
            Total sales from sold items.
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Item Listed</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {user && totalItemsListed}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Keep adding more items.
          </div>
          <div className="text-muted-foreground">
            Total item listed in the marketplace.
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Item Sold</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {user && totalItemsSold}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Keep promoting your items.
          </div>
          <div className="text-muted-foreground">
            Total of your item that successfully sold.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
