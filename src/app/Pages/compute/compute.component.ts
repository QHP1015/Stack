import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
interface Host {
  id: string;
  name: string;
  mirror: string;
  ip: string;
  size: string;
  status: string;
  domain: string;
  power: string;
  time: string;
}
// const BASE_URL = 'http://localhost:8080';
const BASE_URL = 'https://mock.lbviic.com/mock/22';

@Component({
  selector: 'app-compute',
  templateUrl: './compute.component.html',
  styleUrls: ['./compute.component.less'],
})
export class ComputeComponent implements OnInit {
  isVisible = false;
  listOfData: Host[] = [];

  newData = {
    name: '',
    mirror: 'cirros-0.3.3',
    ip: 'provider',
    size: 'm1.tiny',
  };
  constructor(public http: HttpClient, private message: NzMessageService) {
    this.getList();
  }

  ngOnInit(): void {}

  formatTime(time: string) {
    let date = new Date(time);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let hour = date.getHours().toString().padStart(2, '0');
    let minute = date.getMinutes().toString().padStart(2, '0');
    return `${year}/${month}/${day} ${hour}:${minute}`;
  }

  getList(): void {
    this.http.get(`${BASE_URL}/vm/list`).subscribe((res: any) => {
      res.data.forEach((item: Host) => {
        item.time = this.formatTime(item.time);
      });
      this.listOfData = res.data;
    });
  }

  create(): void {
    this.http
      .post(`${BASE_URL}/vm/create`, {
        name: this.newData.name,
        mirror: this.newData.mirror,
        ip: this.newData.ip,
        size: this.newData.size,
      })
      .subscribe(() => {
        this.newData.name = '';
        this.message.success('新增成功');
        this.isVisible = false;
      });
  }

  destroy(id: string) {
    this.http.post(`${BASE_URL}/vm/delete`, { id }).subscribe(() => {
      this.message.success('删除成功');
      this.getList();
    });
  }

  start(id: string) {
    this.http.post(`${BASE_URL}/vm/start`, { id }).subscribe(() => {
      this.message.success('开机成功');
      this.getList();
    });
  }

  suspend(id: string) {
    this.http.post(`${BASE_URL}/vm/suspend`, { id }).subscribe(() => {
      this.message.success('挂起成功');
      this.getList();
    });
  }

  stop(id: string) {
    this.http.post(`${BASE_URL}/vm/stop`, { id }).subscribe(() => {
      this.message.success('关机成功');
      this.getList();
    });
  }

  resume(id: string) {
    this.http.post(`${BASE_URL}/vm/resume`, { id }).subscribe(() => {
      this.message.success('恢复成功');
      this.getList();
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
