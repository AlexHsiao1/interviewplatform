import React from 'react';
import { Button, Card, Input, Form } from '../components/common';

const DesignSystemPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1>面試趣設計系統</h1>
      <p>這是面試趣平台的設計系統文檔與示例頁面，展示了常用元件和樣式。</p>
      
      <section className="section">
        <h2>顏色系統</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {/* 主要顏色 */}
          <div>
            <h3 className="text-lg font-medium mb-2">主要顏色</h3>
            <div className="space-y-2">
              <div className="h-10 rounded bg-primary-50 p-2 text-xs">primary-50</div>
              <div className="h-10 rounded bg-primary-100 p-2 text-xs">primary-100</div>
              <div className="h-10 rounded bg-primary-200 p-2 text-xs">primary-200</div>
              <div className="h-10 rounded bg-primary-300 p-2 text-xs">primary-300</div>
              <div className="h-10 rounded bg-primary-400 p-2 text-xs">primary-400</div>
              <div className="h-10 rounded bg-primary-500 p-2 text-xs text-white">primary-500</div>
              <div className="h-10 rounded bg-primary-600 p-2 text-xs text-white">primary-600</div>
              <div className="h-10 rounded bg-primary-700 p-2 text-xs text-white">primary-700</div>
              <div className="h-10 rounded bg-primary-800 p-2 text-xs text-white">primary-800</div>
              <div className="h-10 rounded bg-primary-900 p-2 text-xs text-white">primary-900</div>
            </div>
          </div>
          
          {/* 次要顏色 */}
          <div>
            <h3 className="text-lg font-medium mb-2">次要顏色</h3>
            <div className="space-y-2">
              <div className="h-10 rounded bg-secondary-50 p-2 text-xs">secondary-50</div>
              <div className="h-10 rounded bg-secondary-100 p-2 text-xs">secondary-100</div>
              <div className="h-10 rounded bg-secondary-200 p-2 text-xs">secondary-200</div>
              <div className="h-10 rounded bg-secondary-300 p-2 text-xs">secondary-300</div>
              <div className="h-10 rounded bg-secondary-400 p-2 text-xs">secondary-400</div>
              <div className="h-10 rounded bg-secondary-500 p-2 text-xs text-white">secondary-500</div>
              <div className="h-10 rounded bg-secondary-600 p-2 text-xs text-white">secondary-600</div>
              <div className="h-10 rounded bg-secondary-700 p-2 text-xs text-white">secondary-700</div>
              <div className="h-10 rounded bg-secondary-800 p-2 text-xs text-white">secondary-800</div>
              <div className="h-10 rounded bg-secondary-900 p-2 text-xs text-white">secondary-900</div>
            </div>
          </div>
          
          {/* 功能性顏色 */}
          <div>
            <h3 className="text-lg font-medium mb-2">功能性顏色</h3>
            <div className="space-y-2">
              <div className="h-10 rounded bg-success-500 p-2 text-xs text-white">success-500</div>
              <div className="h-10 rounded bg-warning-500 p-2 text-xs">warning-500</div>
              <div className="h-10 rounded bg-danger-500 p-2 text-xs text-white">danger-500</div>
              <div className="h-10 rounded bg-info-500 p-2 text-xs text-white">info-500</div>
            </div>
          </div>
          
          {/* 灰階 */}
          <div>
            <h3 className="text-lg font-medium mb-2">灰階</h3>
            <div className="space-y-2">
              <div className="h-10 rounded bg-gray-50 p-2 text-xs">gray-50</div>
              <div className="h-10 rounded bg-gray-100 p-2 text-xs">gray-100</div>
              <div className="h-10 rounded bg-gray-200 p-2 text-xs">gray-200</div>
              <div className="h-10 rounded bg-gray-300 p-2 text-xs">gray-300</div>
              <div className="h-10 rounded bg-gray-400 p-2 text-xs text-white">gray-400</div>
              <div className="h-10 rounded bg-gray-500 p-2 text-xs text-white">gray-500</div>
              <div className="h-10 rounded bg-gray-600 p-2 text-xs text-white">gray-600</div>
              <div className="h-10 rounded bg-gray-700 p-2 text-xs text-white">gray-700</div>
              <div className="h-10 rounded bg-gray-800 p-2 text-xs text-white">gray-800</div>
              <div className="h-10 rounded bg-gray-900 p-2 text-xs text-white">gray-900</div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section">
        <h2>排版</h2>
        <div className="mt-4 space-y-4">
          <div>
            <h1>標題 1 (H1)</h1>
            <p className="text-sm text-gray-500">用於頁面主標題</p>
          </div>
          <div>
            <h2>標題 2 (H2)</h2>
            <p className="text-sm text-gray-500">用於頁面章節標題</p>
          </div>
          <div>
            <h3>標題 3 (H3)</h3>
            <p className="text-sm text-gray-500">用於章節小標題</p>
          </div>
          <div>
            <h4>標題 4 (H4)</h4>
            <p className="text-sm text-gray-500">用於小區塊標題</p>
          </div>
          <div>
            <p>正文文字</p>
            <p className="text-sm text-gray-500">標準段落文字</p>
          </div>
          <div>
            <p className="text-sm">小文字</p>
            <p className="text-sm text-gray-500">用於次要資訊</p>
          </div>
          <div>
            <a href="#">文字連結</a>
            <p className="text-sm text-gray-500">超連結樣式</p>
          </div>
        </div>
      </section>
      
      <section className="section">
        <h2>按鈕</h2>
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">基本按鈕</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">主要按鈕</Button>
              <Button variant="secondary">次要按鈕</Button>
              <Button variant="outline">輪廓按鈕</Button>
              <Button variant="success">成功按鈕</Button>
              <Button variant="danger">危險按鈕</Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">按鈕尺寸</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" size="sm">小按鈕</Button>
              <Button variant="primary" size="md">中按鈕</Button>
              <Button variant="primary" size="lg">大按鈕</Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">按鈕狀態</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">普通狀態</Button>
              <Button variant="primary" disabled>禁用狀態</Button>
              <Button variant="primary" loading>載入中</Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">帶圖標的按鈕</h3>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="primary" 
                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>}
              >
                添加
              </Button>
              <Button 
                variant="outline" 
                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>}
                iconPosition="right"
              >
                下拉
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section">
        <h2>表單元素</h2>
        <div className="mt-4 max-w-xl">
          <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => console.log('表單提交', e)}>
            <div className="space-y-4">
              <Input
                label="標準輸入框"
                placeholder="請輸入內容"
                helperText="這是一個幫助文字"
              />
              
              <Input
                label="密碼輸入框"
                type="password"
                placeholder="請輸入密碼"
              />
              
              <Input
                label="錯誤狀態"
                placeholder="請輸入內容"
                error="這是一個錯誤訊息"
              />
              
              <Input
                label="帶圖標的輸入框"
                placeholder="搜尋..."
                startIcon={
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                }
              />
              
              <Input
                label="禁用狀態"
                placeholder="禁用輸入框"
                disabled
                helperText="此輸入框已禁用"
              />
              
              <div className="flex justify-end">
                <Button variant="primary" type="submit">提交表單</Button>
              </div>
            </div>
          </Form>
        </div>
      </section>
      
      <section className="section">
        <h2>卡片</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            title="基本卡片"
            subtitle="卡片的簡短描述"
          >
            <p>這是卡片內容區域，可以放置任何內容。</p>
          </Card>
          
          <Card
            title="可點擊卡片"
            subtitle="點擊此卡片觸發事件"
            onClick={() => alert('卡片被點擊了！')}
          >
            <p>此卡片有點擊事件，並且有懸停效果。</p>
          </Card>
          
          <Card
            title="帶頁腳的卡片"
            footer={
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">更新於：2023-05-01</span>
                <Button variant="outline" size="sm">詳情</Button>
              </div>
            }
          >
            <p>此卡片底部有頁腳區域，可以放置額外的操作或資訊。</p>
          </Card>
          
          <Card>
            <p>這是一個簡單卡片，沒有標題和副標題。</p>
            <p className="mt-2">適合簡單的內容顯示。</p>
          </Card>
        </div>
      </section>
      
      <section className="section">
        <h2>標籤</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="badge badge-primary">主要</span>
          <span className="badge badge-secondary">次要</span>
          <span className="badge badge-success">成功</span>
          <span className="badge badge-danger">危險</span>
          <span className="badge badge-warning">警告</span>
          <span className="badge badge-info">資訊</span>
        </div>
      </section>
    </div>
  );
};

export default DesignSystemPage; 