
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skull, Coins, Anchor, Ship } from "lucide-react";

const Index = () => {
  const [bilgewaterChance, setBilgewaterChance] = useState(35);
  const [enemyChance, setEnemyChance] = useState(65);
  const [bilgewaterItems, setBilgewaterItems] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [result, setResult] = useState("");
  const [showResult, setShowResult] = useState(false);

  // Auto-calculate chances based on Bilgewater items
  useEffect(() => {
    const baseChance = 35;
    const bonusChance = bilgewaterItems * 5;
    const totalBilgewater = baseChance + bonusChance; // Removed the cap
    setBilgewaterChance(totalBilgewater);
    setEnemyChance(100 - totalBilgewater);
  }, [bilgewaterItems]);

  const drawLottery = async () => {
    setIsDrawing(true);
    setShowResult(false);
    setResult("");

    // Simulate dramatic drawing animation
    await new Promise(resolve => setTimeout(resolve, 2000));

    const random = Math.random() * 100;
    const winner = random < bilgewaterChance ? "Bilgewater" : "Enemy Team";
    const loser = winner === "Bilgewater" ? "Enemy Team" : "Bilgewater";

    setResult(`${loser} ต้องส่งตัวเดิมพันให้ ${winner} ฆ่า!`);
    setIsDrawing(false);
    setShowResult(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 opacity-10">
          <Ship size={120} />
        </div>
        <div className="absolute bottom-20 right-10 opacity-10">
          <Anchor size={100} />
        </div>
        <div className="absolute top-1/2 left-1/4 opacity-5">
          <Skull size={200} />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-4">
            <Skull className="text-red-400" size={48} />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Pirate's Deal
            </h1>
            <Skull className="text-red-400" size={48} />
          </div>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            หลัง Draft ทีมทั้งสองแลกเปลี่ยน "ตัวเดิมพัน" คนละ 1 ตัว<br/>
            ทุก ๆ 5 นาที กรรมการจะสุ่มเพื่อหาฝ่ายที่ "เสียเดิมพัน"<br/>
            ผู้แพ้ต้องส่งตัวเดิมพันไปให้ศัตรูฆ่า โดยไม่ขัดขืนหรือหลบหลีก
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Settings Card */}
          <Card className="bg-slate-800/50 border-slate-600 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-400">
                <Coins size={24} />
                ตั้งค่าการสุ่ม
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-gray-200 mb-2 block">
                  จำนวนไอเท็มใหญ่ของทีม Bilgewater
                </Label>
                <Input
                  type="number"
                  min="0"
                  max="15"
                  value={bilgewaterItems}
                  onChange={(e) => setBilgewaterItems(Math.max(0, parseInt(e.target.value) || 0))}
                  className="bg-slate-700 border-slate-600 text-white"
                />
                <p className="text-sm text-gray-300 mt-1">
                  +5% โอกาสชนะต่อ 1 ไอเท็มใหญ่
                </p>
              </div>

              <Separator className="bg-slate-600" />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-yellow-400">อัตราโอกาส</h3>
                
                <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-gray-100">Bilgewater</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-400">{bilgewaterChance}%</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-gray-100">Enemy Team</span>
                  </div>
                  <span className="text-2xl font-bold text-red-400">{enemyChance}%</span>
                </div>

                {/* Visual probability bar */}
                <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                    style={{ width: `${Math.min(bilgewaterChance, 100)}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Drawing Card */}
          <Card className="bg-slate-800/50 border-slate-600 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <Skull size={24} />
                การสุ่ม
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button
                onClick={drawLottery}
                disabled={isDrawing}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 text-xl"
              >
                {isDrawing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    กำลังสุ่ม...
                  </div>
                ) : (
                  "สุ่มผู้เสียเดิมพัน!"
                )}
              </Button>

              {/* Result Display */}
              {showResult && (
                <div className={`p-6 rounded-lg text-center transform transition-all duration-500 ${
                  result.includes("Bilgewater ต้องส่ง") 
                    ? "bg-red-900/50 border-2 border-red-500" 
                    : "bg-blue-900/50 border-2 border-blue-500"
                }`}>
                  <div className="text-3xl font-bold mb-2">
                    {result.includes("Bilgewater ต้องส่ง") ? "💀" : "⚔️"}
                  </div>
                  <p className="text-xl font-semibold text-gray-100">
                    {result}
                  </p>
                </div>
              )}

              {/* Rules reminder */}
              <div className="bg-slate-700/30 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-400 mb-2">กฎของ Pirate's Deal:</h4>
                <ul className="text-sm text-gray-200 space-y-1">
                  <li>• ตัวเดิมพันต้องไปให้ศัตรูฆ่าโดยไม่ขัดขืน</li>
                  <li>• สุ่มทุก ๆ 5 นาที</li>
                  <li>• Bilgewater เริ่มต้นที่ 35%</li>
                  <li>• +5% ต่อไอเท็มใหญ่ของ Bilgewater</li>
                  <li>• 13 ไอเท็มใหญ่ = ชนะแน่นอน (100%)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-300">
          <p>🏴‍☠️ Welcome to the High Seas of League of Legends 🏴‍☠️</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
