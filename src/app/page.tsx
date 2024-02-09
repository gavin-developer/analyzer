"use client"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState, useEffect } from "react";

class Result {
  constructor(public huou: number, public bau: number, public ga: number, public ca: number, public cua: number, public tom: number) { }
}

export default function Home() {

  const [huou, setHuou] = useState(0)
  const [bau, setBau] = useState(0)
  const [ga, setGa] = useState(0)
  const [ca, setCa] = useState(0)
  const [cua, setCua] = useState(0)
  const [tom, setTom] = useState(0)
  const [wrong, setWrong] = useState(false)

  const [data, setData] = useState([] as Result[])

  useEffect(() => {
    if (data.length) {
      localStorage.setItem('data', JSON.stringify(data));
    }
  }, [data]);

  useEffect(() => {
    const storage = localStorage.getItem('data');
    if (storage != null) {
      setData(JSON.parse(storage))
    }
  }, [])

  return (
    <main>
      <Button onClick={() => {
        localStorage.setItem('data', JSON.stringify([]));
        setData([])
      }}>Reset Data</Button>
      <Table>
        <TableCaption>Top 5 Kết Quả Gần Nhất</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Hươu</TableHead>
            <TableHead>Bầu</TableHead>
            <TableHead>Gà</TableHead>
            <TableHead>Cá</TableHead>
            <TableHead>Cua</TableHead>
            <TableHead>Tôm</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.slice(-5).map((e, i) => <TableRow key={i}>
            <TableCell>{e.huou}</TableCell>
            <TableCell>{e.bau}</TableCell>
            <TableCell>{e.ga}</TableCell>
            <TableCell>{e.ca}</TableCell>
            <TableCell>{e.cua}</TableCell>
            <TableCell>{e.tom}</TableCell>
          </TableRow>)}
        </TableBody>
      </Table>
      <Table>
        <TableCaption>Xác Xuất</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Hươu</TableHead>
            <TableHead>Bầu</TableHead>
            <TableHead>Gà</TableHead>
            <TableHead>Cá</TableHead>
            <TableHead>Cua</TableHead>
            <TableHead>Tôm</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            (() => {
              const XS2 = new Result(0, 0, 0, 0, 0, 0);

              let previous = new Result(0, 0, 0, 0, 0, 0);
              for (const row of data) {
                XS2.huou += previous.huou > 0 && row.huou > 0 ? 1 : 0
                XS2.bau += previous.bau > 0 && row.bau > 0 ? 1 : 0
                XS2.ga += previous.ga > 0 && row.ga > 0 ? 1 : 0
                XS2.ca += previous.ca > 0 && row.ca > 0 ? 1 : 0
                XS2.cua += previous.cua > 0 && row.cua > 0 ? 1 : 0
                XS2.tom += previous.tom > 0 && row.tom > 0 ? 1 : 0
                previous = row;
              }

              return <TableRow>
                <TableCell>{Math.round((XS2.huou / data.length) * 100)}%</TableCell>
                <TableCell>{Math.round((XS2.bau / data.length) * 100)}%</TableCell>
                <TableCell>{Math.round((XS2.ga / data.length) * 100)}%</TableCell>
                <TableCell>{Math.round((XS2.ca / data.length) * 100)}%</TableCell>
                <TableCell>{Math.round((XS2.cua / data.length) * 100)}%</TableCell>
                <TableCell>{Math.round((XS2.tom / data.length) * 100)}%</TableCell>
              </TableRow>
            })()
          }
          {
            (() => {
              const XS1 = data.reduce((previous, current) => {
                previous.huou += current.huou > 0 ? 1 : 0
                previous.bau += current.bau > 0 ? 1 : 0
                previous.ga += current.ga > 0 ? 1 : 0
                previous.ca += current.ca > 0 ? 1 : 0
                previous.cua += current.cua > 0 ? 1 : 0
                previous.tom += current.tom > 0 ? 1 : 0
                return previous
              }, new Result(0, 0, 0, 0, 0, 0))
              return <TableRow>
                <TableCell>{Math.round((XS1.huou / data.length) * 100)}%</TableCell>
                <TableCell>{Math.round((XS1.bau / data.length) * 100)}%</TableCell>
                <TableCell>{Math.round((XS1.ga / data.length) * 100)}%</TableCell>
                <TableCell>{Math.round((XS1.ca / data.length) * 100)}%</TableCell>
                <TableCell>{Math.round((XS1.cua / data.length) * 100)}%</TableCell>
                <TableCell>{Math.round((XS1.tom / data.length) * 100)}%</TableCell>
              </TableRow>
            })()
          }

        </TableBody>
      </Table>
      <div className="grid grid-cols-3 gap-3 pt-4">
        <Button onClick={() => {
          setHuou(huou => (huou + 1) % 4)
        }} variant={huou > 0 ? "default" : "outline"}>{huou} Hươu</Button>
        <Button onClick={() => {
          setBau(bau => (bau + 1) % 4)
        }} variant={bau > 0 ? "default" : "outline"}>{bau} Bầu</Button>
        <Button onClick={() => {
          setGa(ga => (ga + 1) % 4)
        }} variant={ga > 0 ? "default" : "outline"}>{ga} Gà</Button>
        <Button onClick={() => {
          setCa(ca => (ca + 1) % 4)
        }} variant={ca > 0 ? "default" : "outline"}>{ca} Cá</Button>
        <Button onClick={() => {
          setCua(cua => (cua + 1) % 4)
        }} variant={cua > 0 ? "default" : "outline"}>{cua} Cua</Button>
        <Button onClick={() => {
          setTom(tom => (tom + 1) % 4)
        }} variant={tom > 0 ? "default" : "outline"}>{tom} Tôm</Button>
      </div>

      <br />
      <Button className="bg-sky-500" onClick={() => {

        if (huou + bau + ga + ca + tom + cua != 3) {
          setWrong(true)
          return
        }

        setWrong(false)
        setData(e => [...e, new Result(huou, bau, ga, ca, cua, tom)])
        setHuou(0)
        setBau(0)
        setGa(0)
        setCa(0)
        setCua(0)
        setTom(0)
      }}>Thêm</Button>
      {wrong ? <Alert>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          Sai lệch data!
        </AlertDescription>
      </Alert> : <span></span>}
    </main>
  );
}
